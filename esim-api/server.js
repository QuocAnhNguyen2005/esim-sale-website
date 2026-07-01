const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Kiểm tra kết nối Database
pool.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối Postgres:', err.stack);
  } else {
    console.log('Đã kết nối thành công với Postgres!');
  }
});

// Tạo một API mẫu cho React gọi vào
app.get('/api/orders', async (req, res) => {
  try {
    // Lưu ý: bảng 'orders' phải có sẵn trong database của bạn
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server API đang chạy ở port ${PORT}`));
