const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Config CORS
app.use(cors());
app.use(express.json());

// Kết nối PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Kiểm tra kết nối Database
pool.connect((err, client, release) => {
  if (err) {
    console.error('Lỗi kết nối Postgres:', err.stack);
  } else {
    console.log('Đã kết nối thành công với Postgres!');
    release(); // Quan trọng: giải phóng client lại cho pool
  }
});

// API mẫu lấy danh sách orders
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    console.error('Lỗi truy vấn /api/orders:', err);
    res.status(500).json({ error: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.' });
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server API đang chạy ở port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Đang đóng kết nối tới Database...');
  await pool.end();
  server.close(() => {
    console.log('Server đã dừng.');
    process.exit(0);
  });
});
