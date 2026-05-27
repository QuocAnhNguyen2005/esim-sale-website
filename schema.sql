-- Kích hoạt extension để tự động sinh UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Reset toàn bộ cấu trúc cũ
DROP TABLE IF EXISTS esim_profiles CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;
DROP TYPE IF EXISTS esim_status CASCADE;
DROP FUNCTION IF EXISTS claim_available_esim(UUID, UUID) CASCADE;


-- Function tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Bảng Users (Khách hàng)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    support_code VARCHAR(10) UNIQUE, -- VD: CUST-A7X9
    password_hash TEXT NOT NULL, -- Mã hóa bằng bcrypt/Argon2 (Supabase Auth)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_id ON users(id);

CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Function tự động sinh support_code ngẫu nhiên
CREATE OR REPLACE FUNCTION generate_support_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.support_code IS NULL THEN
        NEW.support_code := 'CUST-' || upper(substring(md5(random()::text), 1, 6));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_support_code
BEFORE INSERT ON users FOR EACH ROW EXECUTE PROCEDURE generate_support_code();

-- 2. Bảng Vendors (Nhà cung cấp eSIM như Airhub, Giga...)
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    api_endpoint VARCHAR(255),
    api_key_encrypted TEXT, -- Khóa API phải được mã hóa trước khi lưu
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_vendors_modtime
BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 3. Bảng Products (Các gói cước eSIM)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- VD: "Japan 5GB 7 Days"
    country_code VARCHAR(10) NOT NULL,
    data_limit_gb NUMERIC(5,2), -- Số GB, NULL nếu là unlimited
    duration_days INTEGER NOT NULL CHECK (duration_days > 0),
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN DEFAULT TRUE, -- Thêm cờ để ẩn gói cước cũ
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_products_modtime
BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 4. Bảng Orders (Đơn hàng của khách)
CREATE TYPE order_status AS ENUM ('PENDING_PAYMENT', 'PAID', 'PROVISIONING', 'COMPLETED', 'FAILED', 'REFUNDED');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Liên kết với bảng Users (VD: auth.users trong Supabase)
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    status order_status DEFAULT 'PENDING_PAYMENT',
    payment_intent_id VARCHAR(255), -- ID giao dịch từ cổng thanh toán (Stripe, VNPay)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_orders_modtime
BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 5. Bảng Order_Items (Chi tiết đơn hàng - hỗ trợ mua nhiều eSIM cùng lúc)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    price_at_purchase NUMERIC(10,2) NOT NULL CHECK (price_at_purchase >= 0)
);

-- 6. Bảng eSIM_Profiles (Kho lưu trữ eSIM thực tế cấp cho khách)
CREATE TYPE esim_status AS ENUM ('AVAILABLE', 'RESERVED', 'ASSIGNED', 'ACTIVATED', 'EXPIRED');

CREATE TABLE esim_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id),
    product_id UUID REFERENCES products(id),
    order_item_id UUID REFERENCES order_items(id) ON DELETE SET NULL, -- Gắn với chi tiết đơn hàng nào
    iccid VARCHAR(50) UNIQUE, -- Mã định danh duy nhất của SIM
    lpa_string TEXT, -- Chuỗi để kích hoạt thủ công (VD: LPA:1$smdp.io$activation_code)
    qr_code_url TEXT, -- Link ảnh QR Code
    status esim_status DEFAULT 'AVAILABLE',
    assigned_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_esim_profiles_modtime
BEFORE UPDATE ON esim_profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Tối ưu hóa hiệu suất (Indexing)
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_esim_profiles_order_item_id ON esim_profiles(order_item_id);
CREATE INDEX idx_esim_profiles_iccid ON esim_profiles(iccid);
CREATE INDEX idx_esim_profiles_status_product ON esim_profiles(status, product_id); -- Tối ưu cho việc tìm eSIM AVAILABLE

-- 7. Stored Procedure hỗ trợ cấp phát eSIM an toàn, nhanh chóng và trả về luôn dữ liệu eSIM
CREATE OR REPLACE FUNCTION claim_available_esim(p_product_id UUID, p_order_item_id UUID)
RETURNS TABLE (
    qr_code_url TEXT,
    lpa_string TEXT,
    iccid VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    UPDATE esim_profiles
    SET 
        status = 'ASSIGNED', 
        order_item_id = p_order_item_id, 
        assigned_at = NOW()
    WHERE id = (
        SELECT id 
        FROM esim_profiles
        WHERE product_id = p_product_id 
          AND status = 'AVAILABLE'
        LIMIT 1
        FOR UPDATE SKIP LOCKED
    )
    RETURNING esim_profiles.qr_code_url, esim_profiles.lpa_string, esim_profiles.iccid;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- VÍ HOÀN TIỀN (LOYALTY CASHBACK)
-- ==========================================

-- Bảng lưu trữ Số dư ví của từng khách hàng
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    balance NUMERIC(10,2) DEFAULT 0.00 CHECK (balance >= 0),
    currency VARCHAR(3) DEFAULT 'USD',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng Lịch sử giao dịch ví (Bắt buộc phải có để đối soát)
CREATE TYPE wallet_tx_type AS ENUM ('CASHBACK', 'PAYMENT', 'REFUND');

CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id),
    amount NUMERIC(10,2) NOT NULL, -- Số dương là cộng tiền, số âm là trừ tiền
    type wallet_tx_type NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger cập nhật updated_at cho wallets
CREATE TRIGGER update_wallets_modtime
BEFORE UPDATE ON wallets
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- ==========================================
-- CHỐNG GIAN LẬN THẺ (FRAUD PREVENTION)
-- ==========================================
-- Kiểm tra tốc độ giao dịch (Velocity Check)
CREATE OR REPLACE FUNCTION check_order_velocity(checking_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    recent_order_count INTEGER;
BEGIN
    -- Đếm số đơn hàng user đã tạo trong 15 phút qua
    SELECT COUNT(*) INTO recent_order_count
    FROM orders
    WHERE user_id = checking_user_id 
      AND created_at >= NOW() - INTERVAL '15 minutes';

    -- Giới hạn tối đa 3 đơn hàng / 15 phút
    IF recent_order_count >= 3 THEN
        RETURN FALSE; -- Khóa, báo lỗi gian lận
    ELSE
        RETURN TRUE;  -- Hợp lệ, cho phép qua
    END IF;
END;
$$ LANGUAGE plpgsql;
