const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const zlib = require('zlib');
const fs = require('fs');
const potrace = require('potrace'); // برای استفاده‌های آینده در صورت نیاز

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/html', express.static(path.join(__dirname, 'html')));

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'villain_db',
  password: '123456',
  port: 5432,
});

pool.on('error', (err) => {
  console.error('Database client error:', err);
});

// ساخت جدول کاربران و خریدها در دیتابیس PostgreSQL در صورت عدم وجود
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
    console.log('✅ جداول کاربران و خریدها در دیتابیس بررسی/ایجاد شدند.');
  } catch (err) {
    console.error('خطا در ساخت جداول دیتابیس:', err.message);
  }
}
initTables();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------------------
// مسیرهای جدید برای مدیریت اطلاعات واقعی کاربر و خریدها
// ------------------------------------------------------------------

// ۱. ثبت یا به‌روزرسانی اطلاعات کاربر تلگرام
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
    res.json({ success: true, message: 'کاربر با موفقیت ثبت/بروزرسانی شد.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ۲. دریافت آمار و لیست محصولات خریداری‌شده واقعی کاربر
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

      // فرمت‌بندی تاریخ
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

// ------------------------------------------------------------------

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
      logoSize: logoSize || 55,
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

// تبدیل دقیق کدهای رنگ Hex به آرایه اعشاری 0 تا 1 Lottie
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

// تابع بازگشتی جامع برای تغییر تمام اشکال، خطوط و گروه‌های تودرتو
function changeColorInShapes(shapes, newColorArray) {
  if (!shapes || !Array.isArray(shapes)) return;

  shapes.forEach(shape => {
    // پرکننده‌ها (Fill) و خطوط دور (Stroke)
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
    } 
    // گروه‌ها و پوشه‌های تودرتو
    else if (shape.ty === 'gr' && shape.it) {
      changeColorInShapes(shape.it, newColorArray);
    }
  });
}

// ------------------------------------------------------------------
// تابع تبدیل کدهای SVG (d attribute) به نقاط برداری Lottie
// ------------------------------------------------------------------
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
    } 
    else if (cmd === 'L' || cmd === 'l') {
      curX = cmd === 'L' ? args[0] : curX + args[0];
      curY = cmd === 'L' ? args[1] : curY + args[1];
      v.push([curX, curY]); i.push([0, 0]); o.push([0, 0]);
    } 
    else if (cmd === 'C' || cmd === 'c') {
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
    } 
    else if (cmd === 'Z' || cmd === 'z') {
      isClosed = true;
    }
  });

  return { v, i, o, c: isClosed };
}

// ساخت لایه وکتور خالص برای لوگو با استفاده از مسیرهای ریاضی SVG
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

// خروجی نهایی TGS با اعمال دقیق رنگ بر روی تمام ساختار لایه‌ها
app.post('/api/download-tgs', (req, res) => {
  try {
    const { file, layers, svgPathData, logoColor } = req.body; 
    const absolutePath = path.join(__dirname, file);

    if (!file || !fs.existsSync(absolutePath)) {
      return res.status(404).send('Sticker file not found');
    }

    const rawData = fs.readFileSync(absolutePath, 'utf8');
    let lottieJson = JSON.parse(rawData);

    // ۱. اعمال رنگ‌ها روی لایه‌های پایه استیکر با فیلتر لایه‌های بصری Shape
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

    // ۲. تزریق لایه وکتور در صورت ارسال مسیر SVG
    if (svgPathData && lottieJson.layers) {
      const vectorColor = hexToLottieColor(logoColor || '#ffffff');
      const vectorLayer = createVectorLayer(lottieJson.ip, lottieJson.op, vectorColor, svgPathData);
      lottieJson.layers.unshift(vectorLayer);
    }

    const updatedJsonString = JSON.stringify(lottieJson);

    // ۳. فشرده‌سازی Gzip مطابق با استاندارد TGS تلگرام
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

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});