/**
 * Vendor Integration Strategy (Enterprise Grade)
 * Tích hợp Strategy Pattern và Circuit Breaker Pattern để chống quá tải (Cascading failures).
 */
const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ==========================================
// CIRCUIT BREAKER CONFIGURATION
// ==========================================
const circuitBreaker = {
  vendorA: { failures: 0, lastFailedAt: null, isOpen: false, threshold: 3, timeoutMs: 60000 },
  vendorB: { failures: 0, lastFailedAt: null, isOpen: false, threshold: 3, timeoutMs: 60000 }
};

function checkCircuit(vendorName) {
  const cb = circuitBreaker[vendorName];
  if (cb.isOpen) {
    const timeSinceLastFailure = Date.now() - cb.lastFailedAt;
    if (timeSinceLastFailure > cb.timeoutMs) {
      // Đã qua thời gian chờ (timeout), cho phép thử lại (Half-Open)
      console.log(`[Circuit Breaker] Thử mở lại kết nối tới ${vendorName} (Half-Open)...`);
      cb.isOpen = false;
      return true; // Cho phép gọi API
    }
    return false; // Circuit vẫn mở, chặn gọi API
  }
  return true; // Circuit đang đóng, bình thường
}

function recordFailure(vendorName) {
  const cb = circuitBreaker[vendorName];
  cb.failures += 1;
  cb.lastFailedAt = Date.now();
  if (cb.failures >= cb.threshold) {
    console.error(`[Circuit Breaker] 🚨 ${vendorName} đã vượt ngưỡng lỗi. Kích hoạt ngắt mạch (OPEN CIRCUIT)!`);
    cb.isOpen = true;
  }
}

function recordSuccess(vendorName) {
  const cb = circuitBreaker[vendorName];
  if (cb.failures > 0) {
    console.log(`[Circuit Breaker] ✅ ${vendorName} đã phục hồi. Reset bộ đếm lỗi.`);
    cb.failures = 0;
    cb.isOpen = false;
  }
}

// ==========================================
// VENDOR STRATEGIES
// ==========================================
class VendorStrategy {
  async provisionEsim(orderData) { throw new Error("Phải được implement bởi lớp con"); }
}

class VendorAiralo extends VendorStrategy {
  async provisionEsim(orderData) {
    console.log(`[Vendor: Airalo] Đang cấp phát eSIM cho đơn hàng ${orderData.id}...`);
    // Giả lập API delay 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mô phỏng tỷ lệ lỗi ngẫu nhiên 20% để test Circuit Breaker
        if (Math.random() < 0.2) return reject(new Error('Airalo API Timeout/503'));
        
        resolve({
          success: true,
          iccid: '89840' + Math.floor(Math.random() * 100000000000000),
          lpa: 'LPA:1$smdp.airalo.com$MOCK-CODE-AIRALO'
        });
      }, 800);
    });
  }
}

class VendorTruphone extends VendorStrategy {
  async provisionEsim(orderData) {
    console.log(`[Vendor: Truphone] Đang cấp phát eSIM cho đơn hàng ${orderData.id}...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          iccid: '89012' + Math.floor(Math.random() * 100000000000000),
          lpa: 'LPA:1$smdp.truphone.com$MOCK-CODE-TRUPHONE'
        });
      }, 1200);
    });
  }
}

const vendorA = new VendorAiralo();
const vendorB = new VendorTruphone();

/**
 * Hàm điều phối (Router) thông minh với Circuit Breaker.
 */
async function provisionEsimWithFallback(orderData) {
  let result = null;

  // 1. Thử gọi Vendor chính (Airalo) nếu Circuit chưa bị ngắt
  if (checkCircuit('vendorA')) {
    try {
      result = await vendorA.provisionEsim(orderData);
      recordSuccess('vendorA');
      return result;
    } catch (error) {
      console.warn(`[Cảnh báo] Airalo lỗi: ${error.message}.`);
      recordFailure('vendorA');
      // Tiếp tục xuống bước Fallback
    }
  } else {
    console.log(`[Định tuyến] Airalo đang bị ngắt mạch (Circuit Open). Tự động bỏ qua và gọi thẳng Vendor phụ...`);
  }

  // 2. Fallback sang Vendor phụ (Truphone)
  if (checkCircuit('vendorB')) {
    try {
      console.log(`[Định tuyến] Đang kích hoạt Fallback sang Truphone...`);
      result = await vendorB.provisionEsim(orderData);
      recordSuccess('vendorB');
      
      // Ghi log Fallback vào DB (Audit Log)
      try {
        await pool.query(
          `INSERT INTO audit_logs (user_id, action, resource_type, resource_id, new_value)
           VALUES (NULL, 'VENDOR_FALLBACK', 'esim_orders', $1, $2)`,
          [orderData.id, JSON.stringify({ from: 'Airalo', to: 'Truphone' })]
        );
      } catch (dbErr) { /* Bỏ qua lỗi DB ở background */ }
      
      return result;
    } catch (fallbackError) {
      console.error(`[Cảnh báo] Truphone cũng lỗi: ${fallbackError.message}.`);
      recordFailure('vendorB');
    }
  }

  // 3. Cả 2 đều chết hoặc bị ngắt mạch
  console.error(`[Lỗi Nghiêm Trọng] Cả hệ thống cung cấp (Vendors) đều thất bại cho đơn hàng ${orderData.id}`);
  throw new Error('All vendors failed or circuit is open');
}

module.exports = {
  provisionEsimWithFallback
};
