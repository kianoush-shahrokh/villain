const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const zlib = require('zlib');
const fs = require('fs');
const potrace = require('potrace');

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// سرو فایل‌های استاتیک
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/html', express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

// روت مانیفست TonConnect
app.get('/tonconnect-manifest.json', (req, res) => {
  const manifestPath = path.join(__dirname, 'tonconnect-manifest.json');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (fs.existsSync(manifestPath)) {
    return res.sendFile(manifestPath);
  }

  res.json({
    url: 'https://villain-rexr.onrender.com',
    name: 'Villain Sticker Store',
    iconUrl: 'https://villain-rexr.onrender.com/assets/images/icons/1.png',
    termsOfUseUrl: 'https://villain-rexr.onrender.com',
    privacyPolicyUrl: 'https://villain-rexr.onrender.com'
  });
});

// اتصال به دیتابیس PostgreSQL با پشتیبانی امن از SSL برای Render
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        user: 'postgres',
        host: '127.0.0.1',
        database: 'villain_db',
        password: '123456',
        port: 5432,
      }
);

pool.on('error', (err) => {
  console.error('Database client error:', err);
});

// تابع خواندن خودکار فایل‌های ایموجی از پوشه assets/emojis
function getEmojiFiles() {
  const emojisDir = path.join(__dirname, 'assets', 'emojis');
  if (!fs.existsSync(emojisDir)) {
    return [];
  }
  return fs.readdirSync(emojisDir).sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });
}

// ساخت جداول دیتابیس و ثبت دقیق ۶۸ ایموجی با فایل‌های واقعی پوشه assets/emojis
async function initTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        telegram_id TEXT PRIMARY KEY,
        full_name TEXT,
        username TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS purchases (
        id SERIAL PRIMARY KEY,
        telegram_id TEXT,
        product_name TEXT,
        price TEXT,
        status TEXT DEFAULT 'completed',
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(telegram_id) REFERENCES users(telegram_id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS custom_stickers (
        id SERIAL PRIMARY KEY,
        base_sticker_id TEXT,
        layers_data TEXT,
        logo_data TEXT,
        text_data TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // بازنشانی کامل جدول محصولات برای ثبت فایل‌های پوشه assets/emojis
    await pool.query('DROP TABLE IF EXISTS products CASCADE');
    await pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT DEFAULT 'emojis',
        price_ton TEXT DEFAULT '0.50',
        json_path TEXT,
        thumbnail_path TEXT,
        webp_path TEXT,
        svg_path TEXT,
        tgs_path TEXT,
        zip_path TEXT
      )
    `);

    // لیست ۶۸ قیمت دقیق اعلام‌شده توسط کارفرما
    const exactPrices = [
      '0.50', '0.50', '0.50', '0.50', '0.50', '0.50', '0.50', '0.50', '0.50', '0.50',
      '0.50', '0.75', '0.75', '0.50', '1.00', '0.50', '0.50', '0.50', '0.50', '0.75', '0.75', '1.50',
      '0.75', '0.50', '0.75', '2.00', '0.50', '0.75', '0.50', '0.75', '0.50', '3.00', '0.50',
      '0.75', '2.00', '0.75', '1.50', '0.75', '0.75', '1.00', '2.00', '2.00', '0.50', '0.50', '1.00',
      '0.50', '1.00', '0.50', '0.75', '2.00', '0.50', '0.50', '0.75', '2.00', '0.50', '1.50',
      '1.50', '1.50', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00'
    ];

    const filesInEmojis = getEmojiFiles();
    const jsonFiles = filesInEmojis.filter(f => f.endsWith('.json'));
    const imgFiles = filesInEmojis.filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.svg'));

    for (let i = 0; i < 68; i++) {
      const numStr = String(i + 1).padStart(3, '0');
      const title = `Emoji ${numStr}`;
      const price = exactPrices[i] || '0.50';

      let jsonRel = 'assets/stickers/GiftShop_Farsi_AgAD-BwAAvQXsVA.json';
      let imgRel = 'assets/stickers/GiftShop_Farsi_AgAD-BwAAvQXsVA.webp';

      if (jsonFiles.length > 0) {
        jsonRel = `assets/emojis/${jsonFiles[i % jsonFiles.length]}`;
      }
      if (imgFiles.length > 0) {
        imgRel = `assets/emojis/${imgFiles[i % imgFiles.length]}`;
      } else if (jsonFiles.length > 0) {
        imgRel = jsonRel;
      }

      await pool.query(`
        INSERT INTO products (title, category, price_ton, json_path, thumbnail_path, webp_path, svg_path, tgs_path, zip_path)
        VALUES ($1, 'emojis', $2, $3, $4, $4, $4, 'assets/stickers/GiftShop_Farsi_AgAD-BwAAvQXsVA.tgs.zip', 'assets/stickers/GiftShop_Farsi_AgAD-BwAAvQXsVA.zip')
      `, [title, price, jsonRel, imgRel]);
    }

    console.log('✅ تمامی ۶۸ ایموجی مستقیماً از پوشه assets/emojis متصل و ثبت شدند.');
  } catch (err) {
    console.error('خطا در ساخت دیتابیس:', err.message);
  }
}
initTables();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// دریافت لیست محصولات
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// دریافت مشخصات یک محصول
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'محصول یافت نشد.' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ارسال مستقیم فایل JSON اختصاصی هر محصول
app.get('/api/product-json/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT json_path FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0 || !result.rows[0].json_path) {
      return res.status(404).json({ success: false, message: 'فایل در دیتابیس یافت نشد.' });
    }

    let filePath = result.rows[0].json_path;
    const fullPath = path.join(__dirname, filePath.startsWith('/') ? filePath.slice(1) : filePath);

    if (!fs.existsSync(fullPath)) {
      const fallbackPath = path.join(__dirname, 'assets', 'stickers', 'GiftShop_Farsi_AgAD-BwAAvQXsVA.json');
      if (fs.existsSync(fallbackPath)) {
        res.setHeader('Content-Type', 'application/json');
        return res.sendFile(fallbackPath);
      }
      return res.status(404).json({ success: false, message: 'فایل یافت نشد.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.sendFile(fullPath);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ثبت کاربر تلگرام
app.post('/api/users', async (req, res) => {
  const { telegram_id, full_name, username } = req.body;
  if (!telegram_id) {
    return res.status(400).json({ success: false, message: 'telegram_id الزامی است.' });
  }

  try {
    const query = `
      INSERT INTO users (telegram_id, full_name, username) 
      VALUES ($1, $2, $3) 
      ON CONFLICT (telegram_id) DO UPDATE SET 
      full_name = EXCLUDED.full_name, 
      username = EXCLUDED.username;
    `;
    await pool.query(query, [telegram_id.toString(), full_name, username]);
    res.json({ success: true, message: 'کاربر ثبت شد.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// دریافت خریدهای کاربر
app.get('/api/user/purchases', async (req, res) => {
  const telegramId = req.query.telegram_id;
  if (!telegramId) {
    return res.status(400).json({ success: false, message: 'telegram_id ارسال نشده است.' });
  }

  try {
    const result = await pool.query(
      `SELECT product_name as name, purchase_date as date, status FROM purchases WHERE telegram_id = $1 ORDER BY id DESC`,
      [telegramId.toString()]
    );

    let purchasesCount = 0;
    let pendingCount = 0;
    let downloadedCount = 0;
    const products = [];

    result.rows.forEach(row => {
      purchasesCount++;
      if (row.status === 'pending') pendingCount++;
      else if (row.status === 'downloaded' || row.status === 'completed') downloadedCount++;

      const formattedDate = row.date ? new Date(row.date).toLocaleDateString('fa-IR') : 'اخیر';

      products.push({
        name: row.name,
        date: formattedDate,
        status: row.status
      });
    });

    res.json({
      success: true,
      purchasesCount,
      pendingCount,
      downloadedCount,
      products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ذخیره طراحی سفارشی
app.post('/api/save-design', async (req, res) => {
  const { stickerId, layers, logoData, logoSize, textData, formatMode } = req.body;
  try {
    const query = `
      INSERT INTO custom_stickers (base_sticker_id, layers_data, logo_data, text_data)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const payloadText = {
      ...(textData || {}),
      logoSize: logoSize || 48,
      formatMode: formatMode || 'tgs'
    };
    const values = [ 
      stickerId || null, 
      JSON.stringify(layers || {}), 
      logoData || null, 
      JSON.stringify(payloadText) 
    ];
    const result = await pool.query(query, values);
    res.status(200).json({ success: true, message: 'Saved successfully', designId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

function hexToLottieColor(hex) {
  if (!hex) return [1, 1, 1, 1];
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return [
    Math.round(r * 1000) / 1000,
    Math.round(g * 1000) / 1000,
    Math.round(b * 1000) / 1000,
    1
  ];
}

function changeColorInShapes(shapes, newColorArray) {
  if (!shapes || !Array.isArray(shapes)) return;

  shapes.forEach(shape => {
    if (shape.ty === 'fl' || shape.ty === 'st') {
      if (shape.c && shape.c.k) {
        if (typeof shape.c.k[0] === 'number') {
          shape.c.k = newColorArray;
        } else if (Array.isArray(shape.c.k)) {
          shape.c.k.forEach(kf => {
            if (kf && kf.s && Array.isArray(kf.s)) kf.s = newColorArray;
            if (kf && kf.e && Array.isArray(kf.e)) kf.e = newColorArray;
          });
        }
      }
    } else if (shape.ty === 'gr' && shape.it) {
      changeColorInShapes(shape.it, newColorArray);
    }
  });
}

function svgPathToLottie(d) {
  const v = [], i = [], o = [];
  let isClosed = false;
  if (!d) return { v: [[0,0]], i: [[0,0]], o: [[0,0]], c: false };

  const commands = d.match(/[a-df-z][^a-df-z]*/ig);
  if (!commands) return { v, i, o, c: isClosed };

  let curX = 0, curY = 0;

  commands.forEach(cmdStr => {
    const cmd = cmdStr[0];
    const args = cmdStr.slice(1).trim().split(/[\s,]+/).filter(x => x).map(parseFloat);

    if (cmd === 'M' || cmd === 'm') {
      curX = cmd === 'M' ? args[0] : curX + args[0];
      curY = cmd === 'M' ? args[1] : curY + args[1];
      v.push([curX, curY]); i.push([0, 0]); o.push([0, 0]);
    } else if (cmd === 'L' || cmd === 'l') {
      curX = cmd === 'L' ? args[0] : curX + args[0];
      curY = cmd === 'L' ? args[1] : curY + args[1];
      v.push([curX, curY]); i.push([0, 0]); o.push([0, 0]);
    } else if (cmd === 'C' || cmd === 'c') {
      let cp1x = cmd === 'C' ? args[0] : curX + args[0];
      let cp1y = cmd === 'C' ? args[1] : curY + args[1];
      let cp2x = cmd === 'C' ? args[2] : curX + args[2];
      let cp2y = cmd === 'C' ? args[3] : curY + args[3];
      let x    = cmd === 'C' ? args[4] : curX + args[4];
      let y    = cmd === 'C' ? args[5] : curY + args[5];

      const prevIndex = v.length - 1;
      if (prevIndex >= 0) {
        o[prevIndex] = [cp1x - v[prevIndex][0], cp1y - v[prevIndex][1]];
      }
      
      v.push([x, y]);
      i.push([cp2x - x, cp2y - y]);
      o.push([0, 0]);
      curX = x; curY = y;
    } else if (cmd === 'Z' || cmd === 'z') {
      isClosed = true;
    }
  });

  return { v, i, o, c: isClosed };
}

function createVectorLayer(ip, op, colorArray, svgPathData) {
  const lottiePathKeys = svgPathToLottie(svgPathData);

  return {
    ddd: 0,
    ind: 999,
    ty: 4,
    nm: "CustomLogoVector",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [256, 256, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "sh",
            ks: { a: 0, k: lottiePathKeys },
            nm: "LogoPath"
          },
          {
            ty: "fl",
            c: { a: 0, k: colorArray },
            o: { a: 0, k: 100 },
            r: 1,
            nm: "Fill"
          },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 }
          }
        ]
      }
    ],
    ip: ip || 0,
    op: op || 60,
    st: 0,
    bm: 0
  };
}

// دانلود فایل نهایی TGS
app.post('/api/download-tgs', (req, res) => {
  try {
    const { file, layers, svgPathData, logoColor } = req.body; 
    const relativePath = file || 'assets/stickers/GiftShop_Farsi_AgAD-BwAAvQXsVA.json';
    const absolutePath = path.join(__dirname, relativePath.startsWith('/') ? relativePath.slice(1) : relativePath);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).send('Sticker file not found');
    }

    const rawData = fs.readFileSync(absolutePath, 'utf8');
    let lottieJson = JSON.parse(rawData);

    if (layers && typeof layers === 'object' && lottieJson.layers) {
      const visualLayers = lottieJson.layers.filter(l => l.ty === 4 && l.shapes && l.shapes.length > 0);

      Object.keys(layers).forEach(idx => {
        const layerIdx = parseInt(idx, 10);
        const colorArray = hexToLottieColor(layers[idx]);
        
        const targetLayer = visualLayers[layerIdx] || lottieJson.layers[layerIdx];
        if (targetLayer && targetLayer.shapes) {
          changeColorInShapes(targetLayer.shapes, colorArray);
        }
      });
    }

    if (svgPathData && lottieJson.layers) {
      const vectorColor = hexToLottieColor(logoColor || '#ffffff');
      const vectorLayer = createVectorLayer(lottieJson.ip, lottieJson.op, vectorColor, svgPathData);
      lottieJson.layers.unshift(vectorLayer);
    }

    const updatedJsonString = JSON.stringify(lottieJson);

    zlib.gzip(updatedJsonString, { level: 9 }, (err, compressedData) => {
      if (err) return res.status(500).send('Compression error');

      res.setHeader('Content-Type', 'application/x-tgsticker');
      res.setHeader('Content-Disposition', 'attachment; filename="villain-vector-sticker.tgs"');
      res.send(compressedData);
    });

  } catch (error) {
    console.error('TGS Generation error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// اندپوینت ارسال مستقیم فایل به چت تلگرام کاربر (جهت حل مشکل دانلود در مینی‌اپ)
app.post('/api/send-to-telegram', async (req, res) => {
  try {
    const { telegram_id, fileBase64, filename, caption } = req.body;
    if (!telegram_id || !fileBase64) {
      return res.status(400).json({ success: false, message: 'اطلاعات ناقص است.' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || '8937158151:AAE94CZGvR6P7cu-B3Q1YwV8fc2l6hYhLp8';
    if (!botToken) {
      return res.status(500).json({ success: false, message: 'توکن ربات تلگرام در سرور تنظیم نشده است.' });
    }

    const buffer = Buffer.from(fileBase64, 'base64');
    const formData = new FormData();
    formData.append('chat_id', telegram_id.toString());
    formData.append('document', new Blob([buffer]), filename || 'sticker.tgs');
    if (caption) {
      formData.append('caption', caption);
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: 'POST',
      body: formData
    });

    const tgData = await tgRes.json();
    if (tgData.ok) {
      res.json({ success: true, message: 'فایل با موفقیت به چت تلگرام شما ارسال شد!' });
    } else {
      res.status(400).json({ success: false, message: tgData.description || 'خطا در ارسال به تلگرام' });
    }
  } catch (err) {
    console.error('Telegram Send Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});