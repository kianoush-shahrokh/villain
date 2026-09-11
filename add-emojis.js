const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL, ssl: false }
    : {
        user: 'postgres',
        host: '127.0.0.1',
        database: 'villain_db',
        password: '123456',
        port: 5432,
      }
);

async function importEmojis() {
  try {
    const emojisDir = path.join(__dirname, 'assets', 'emojis');
    const files = fs.readdirSync(emojisDir).filter(f => f.endsWith('.json'));

    console.log(`تعداد فایل‌های پیدا شده: ${files.length}`);

    for (const file of files) {
      const name = path.parse(file).name;
      const title = `Emoji ${name}`;
      const jsonPath = `assets/emojis/${file}`;

      const check = await pool.query('SELECT id FROM products WHERE json_path = $1', [jsonPath]);
      
      if (check.rows.length === 0) {
        await pool.query(
          `INSERT INTO products (title, category, price_ton, json_path, thumbnail_path, svg_path, tgs_path) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [title, 'emojis', '4.00', jsonPath, jsonPath, jsonPath, jsonPath]
        );
        console.log(`✅ اضافه شد: ${title}`);
      } else {
        console.log(`⚡ از قبل وجود دارد: ${title}`);
      }
    }

    console.log('🎉 تمام ایموجی‌ها با موفقیت به دیتابیس اضافه شدند.');
    process.exit(0);
  } catch (err) {
    console.error('❌ خطا:', err.message);
    process.exit(1);
  }
}

importEmojis();