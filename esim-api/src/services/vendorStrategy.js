/**
 * Vendor Integration Strategy
 * Triển khai mẫu thiết kế Strategy pattern để dễ dàng chuyển đổi/fallback giữa các nhà mạng.
 */
const axios = require('axios');

class VendorA {
  async provisionEsim(orderData) {
    console.log(`[Vendor A] Đang cố gắng cấp phát eSIM cho đơn hàng ${orderData.id}...`);
    // Giả lập gọi API thực tế tới Vendor A (VD: Airalo)
    // throw new Error('API Vendor A timeout'); // Uncomment để test fallback
    
    // Giả lập thành công sau 1s
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          iccid: '89840' + Math.floor(Math.random() * 100000000000000),
          lpa: 'LPA:1$smdp.vendorA.com$MOCK-CODE-A'
        });
      }, 1000);
    });
  }
}

class VendorB {
  async provisionEsim(orderData) {
    console.log(`[Vendor B] Đang cố gắng cấp phát eSIM cho đơn hàng ${orderData.id}...`);
    // Giả lập gọi API thực tế tới Vendor B (VD: Truphone)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          iccid: '89012' + Math.floor(Math.random() * 100000000000000),
          lpa: 'LPA:1$smdp.vendorB.com$MOCK-CODE-B'
        });
      }, 1500);
    });
  }
}

const vendorA = new VendorA();
const vendorB = new VendorB();

/**
 * Hàm điều phối (Router). Sẽ ưu tiên gọi Vendor A, nếu lỗi hoặc hết số, sẽ Fallback sang Vendor B.
 */
async function provisionEsimWithFallback(orderData) {
  try {
    // 1. Thử gọi Vendor chính (Vendor A)
    return await vendorA.provisionEsim(orderData);
  } catch (error) {
    console.warn(`[Cảnh báo] Vendor A thất bại: ${error.message}. Kích hoạt Fallback sang Vendor B...`);
    
    // 2. Fallback sang Vendor phụ (Vendor B)
    try {
      return await vendorB.provisionEsim(orderData);
    } catch (fallbackError) {
      console.error(`[Lỗi Nghiêm Trọng] Cả 2 Vendors đều thất bại cho đơn hàng ${orderData.id}`);
      throw new Error('All vendors failed to provision eSIM');
    }
  }
}

module.exports = {
  provisionEsimWithFallback
};
