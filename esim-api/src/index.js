const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { initWorker, addOrderToQueue } = require('./services/queueService');

const app = express();

// Config CORS
app.use(cors());
app.use(express.json());

// 1. Áp dụng Rate Limiting bảo vệ API
// (Mô phỏng Zero Trust: Hạn chế tối đa tấn công DDoS/Brute-force)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn 100 requests / 15 phút mỗi IP
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// 2. Kết nối Database PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Lỗi kết nối Postgres:', err.stack);
  } else {
    console.log('Đã kết nối thành công với Postgres!');
    release();
  }
});

// 3. Khởi chạy Background Worker cho luồng Queue
initWorker();

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

// API MỚI: Tiếp nhận đơn hàng và đưa vào Hàng đợi (Queue) xử lý
app.post('/api/orders', async (req, res) => {
  const { productId, email, paymentIntentId } = req.body;
  
  try {
    // Lưu đơn hàng vào DB với trạng thái PENDING/PROVISIONING
    const orderData = {
      id: 'ORDER-' + Date.now(),
      productId,
      email,
      status: 'PROVISIONING'
    };
    
    // (Thực tế: INSERT INTO orders ... và lấy ra order ID)
    
    // Đẩy đơn hàng vào Queue để xử lý Background (Không làm treo request của User)
    await addOrderToQueue(orderData);
    
    // Phản hồi ngay cho người dùng
    res.status(202).json({
      message: 'Đơn hàng đã được tiếp nhận và đang xử lý tạo eSIM.',
      orderId: orderData.id
    });
    
  } catch (err) {
    console.error('Lỗi khi tiếp nhận đơn hàng:', err);
    res.status(500).json({ error: 'Lỗi hệ thống.' });
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Backend Core API đang chạy ở port ${PORT}`);
  console.log(`🛡️  Rate Limiting, Redis Queue & Fallback Strategy đã được kích hoạt!`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Đang đóng kết nối tới Database...');
  await pool.end();
  server.close(() => {
    console.log('Server đã dừng.');
    process.exit(0);
  });
});
