const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(cors());

// افزایش محدودیت بادی به دلیل ارسال عکس‌های Base64
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// دسترسی به فایل‌های استاتیک و پوشه‌های پروژه
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/html', express.static(path.join(__dirname, 'html')));

// تنظیمات اتصال دیتابیس
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'villain_db',
  password: '123456',
  port: 5432,
});

// جلوگیری از خطای غیرمنتظره دیتابیس
pool.on('error', (err) => {
  console.error('خطای غیرمنتظره کلاینت دیتابیس:', err);
});

// مسیر صفحه اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// دریافت لیست استیکرها
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('خطای دیتابیس:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ذخیره تغییرات استیکر در دیتابیس
app.post('/api/save-design', async (req, res) => {
  const { stickerId, layers, logoData, textData } = req.body;

  try {
    const query = `
      INSERT INTO custom_stickers (base_sticker_id, layers_data, logo_data, text_data)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;

    const values = [
      stickerId || null,
      JSON.stringify(layers || {}),
      logoData || null,
      JSON.stringify(textData || {})
    ];

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      message: 'طرح با موفقیت در دیتابیس ذخیره شد',
      designId: result.rows[0].id
    });
  } catch (err) {
    console.error('خطا در ذخیره طرح در دیتابیس:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// اجرای سرور روی پورت 3001
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 سرور با موفقیت اجرا شد: http://localhost:${PORT}`);
});

process.stdin.resume();