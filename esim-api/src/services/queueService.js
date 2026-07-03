const { Queue, Worker } = require('bullmq');
const redisClient = require('../config/redis');
const { provisionEsimWithFallback } = require('./vendorStrategy');

// Tạo Queue xử lý đơn hàng eSIM
const esimOrderQueue = new Queue('esim-orders', { connection: redisClient });

// Hàm thêm đơn hàng vào Queue
async function addOrderToQueue(orderData) {
  await esimOrderQueue.add('provision-esim', orderData, {
    attempts: 3,          // Tự động thử lại 3 lần nếu có lỗi không mong muốn
    backoff: {
      type: 'exponential',
      delay: 5000         // Chờ 5s, 10s, 20s giữa các lần retry
    }
  });
  console.log(`[Queue] Đã thêm đơn hàng ${orderData.id} vào hàng đợi xử lý.`);
}

// Khởi tạo Worker để xử lý Background Job
const initWorker = () => {
  const worker = new Worker('esim-orders', async (job) => {
    console.log(`[Worker] Bắt đầu xử lý Job ${job.id} cho đơn hàng ${job.data.id}`);
    
    // Thực hiện cấp phát eSIM thông qua Vendor Strategy
    const result = await provisionEsimWithFallback(job.data);
    
    // (Tại đây sẽ lưu kết quả ICCID, mã QR vào Database PostgreSQL bằng pool.query)
    console.log(`[Worker] Hoàn tất cấp phát cho đơn hàng ${job.data.id}. ICCID: ${result.iccid}`);
    
    return result;
  }, { connection: redisClient });

  worker.on('completed', (job) => {
    console.log(`[Worker] Job ${job.id} hoàn thành thành công!`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job.id} thất bại sau nhiều lần thử: ${err.message}`);
    // Tại đây có thể kích hoạt gửi Email cảnh báo cho Admin
  });
};

module.exports = {
  addOrderToQueue,
  initWorker
};
