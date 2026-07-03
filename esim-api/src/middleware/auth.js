const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Middleware: Xác thực (Authentication)
 * Hỗ trợ 2 phương thức:
 * 1. Bearer Token (JWT cho Admin/Customer)
 * 2. X-API-Key (Cho Đối tác B2B)
 */
const authenticate = async (req, res, next) => {
  try {
    // 1. Kiểm tra API Key (Dành cho B2B Partners)
    const apiKey = req.header('X-API-Key');
    if (apiKey) {
      // Trong thực tế, bạn sẽ cache cái này vào Redis để tăng tốc
      const result = await pool.query(
        'SELECT id, user_id, status FROM b2b_partners WHERE api_secret_key = $1 AND status = \'ACTIVE\'',
        [apiKey]
      );
      
      if (result.rows.length > 0) {
        req.user = { 
          id: result.rows[0].user_id, 
          b2b_partner_id: result.rows[0].id,
          role: 'B2B_PARTNER' 
        };
        return next();
      } else {
        return res.status(401).json({ error: 'Invalid or Inactive API Key' });
      }
    }

    // 2. Kiểm tra JWT Token (Dành cho người dùng thông thường / Admin)
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-key-change-me');
      req.user = decoded; // { id, role, email }
      return next();
    }

    // Nếu không có Token hay API Key
    return res.status(401).json({ error: 'Authentication required. Please provide a token or API Key.' });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

/**
 * Middleware: Phân quyền (RBAC)
 * Kiểm tra xem người dùng có Role nằm trong mảng allowedRoles không.
 */
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: 'Access denied: Role is missing.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access denied: Requires one of [${allowedRoles.join(', ')}], but got ${req.user.role}` 
      });
    }

    next();
  };
};

/**
 * Middleware: Nhật ký Kiểm toán (Audit Logging)
 * Ghi lại các hành động quan trọng (như cấp eSIM, thay đổi chiết khấu)
 */
const auditLog = (action, resourceType) => {
  return async (req, res, next) => {
    // Để ghi log sau khi API thực thi xong, ta hook vào sự kiện finish của response
    res.on('finish', async () => {
      // Chỉ log những request thành công (hoặc tuỳ chiến lược của bạn)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        try {
          const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
          // Resource ID có thể lấy từ params hoặc body (nếu có)
          const resourceId = req.params.id || req.body.orderId || req.body.id || 'N/A';
          
          await pool.query(
            `INSERT INTO audit_logs (user_id, action, resource_type, resource_id, ip_address, new_value)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [req.user?.id, action, resourceType, resourceId, ipAddress, JSON.stringify(req.body)]
          );
        } catch (err) {
          console.error('Lỗi khi ghi Audit Log:', err);
        }
      }
    });
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
  auditLog
};
