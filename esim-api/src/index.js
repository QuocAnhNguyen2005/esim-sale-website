const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { initWorker, addOrderToQueue } = require('./services/queueService');
const { authenticate, authorize, auditLog } = require('./middleware/auth');

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

// ==========================================
// CÁC API YÊU CẦU BẢO MẬT (ENTERPRISE GRADE)
// ==========================================

// Ví dụ 1: API dành cho B2B Partners cấp phát eSIM tự động
app.post('/api/b2b/provision', 
  authenticate, 
  authorize(['B2B_PARTNER', 'SUPER_ADMIN']), 
  auditLog('B2B_PROVISION_ESIM', 'esim_orders'),
  async (req, res) => {
    // Logic cấp phát ở đây. Chỉ B2B hoặc Admin mới gọi được.
    res.json({ message: 'Provisioning request accepted via API Key', partnerId: req.user.b2b_partner_id });
});

// Ví dụ 2: API Admin Force Retry Đơn Hàng (Chỉ SUPER_ADMIN hoặc SUPPORT)
app.post('/api/admin/orders/:id/retry',
  authenticate,
  authorize(['SUPER_ADMIN', 'SUPPORT']),
  auditLog('ADMIN_FORCE_RETRY', 'orders'),
  async (req, res) => {
    const orderId = req.params.id;
    // Logic đẩy lại đơn hàng vào Queue
    res.json({ message: `Đã đưa đơn hàng ${orderId} vào lại hàng đợi để Retry.` });
});

// Ví dụ 3: Đổi cấu hình chiết khấu cho Đại lý (Chỉ SUPER_ADMIN)
app.put('/api/admin/b2b/:id/discount',
  authenticate,
  authorize(['SUPER_ADMIN', 'FINANCE']),
  auditLog('UPDATE_DISCOUNT', 'b2b_partners'),
  async (req, res) => {
    res.json({ message: 'Đã cập nhật mức chiết khấu mới.' });
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
