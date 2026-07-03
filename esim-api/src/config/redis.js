const Redis = require('ioredis');
require('dotenv').config();

// Sử dụng REDIS_URL từ biến môi trường, mặc định kết nối localhost
const redisClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redisClient.on('error', (err) => {
  console.error('Lỗi kết nối Redis:', err);
});

redisClient.on('connect', () => {
  console.log('Đã kết nối thành công với Redis!');
});

module.exports = redisClient;
