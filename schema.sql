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

-- 1. Bảng Vendors (Nhà cung cấp eSIM như Airhub, Giga...)
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

-- 2. Bảng Products (Các gói cước eSIM)
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

-- 3. Bảng Orders (Đơn hàng của khách)
CREATE TYPE order_status AS ENUM ('PENDING_PAYMENT', 'PAID', 'PROVISIONING', 'COMPLETED', 'FAILED', 'REFUNDED');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Liên kết với bảng Users (VD: auth.users trong Supabase)
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    status order_status DEFAULT 'PENDING_PAYMENT',
    payment_intent_id VARCHAR(255), -- ID giao dịch từ cổng thanh toán (Stripe, VNPay)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_orders_modtime
BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 4. Bảng Order_Items (Chi tiết đơn hàng - hỗ trợ mua nhiều eSIM cùng lúc)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    price_at_purchase NUMERIC(10,2) NOT NULL CHECK (price_at_purchase >= 0)
);

-- 5. Bảng eSIM_Profiles (Kho lưu trữ eSIM thực tế cấp cho khách)
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

-- 6. Stored Procedure hỗ trợ cấp phát eSIM an toàn, nhanh chóng và trả về luôn dữ liệu eSIM
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
