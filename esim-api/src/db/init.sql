-- ==========================================
-- eSIM Enterprise Database Schema (PostgreSQL)
-- ==========================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS & B2B PARTNERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'CUSTOMER', -- CUSTOMER, B2B_PARTNER, ADMIN, SUPPORT, FINANCE
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS b2b_partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    discount_rate DECIMAL(5,2) DEFAULT 0.00, -- e.g. 15.00 for 15%
    api_secret_key VARCHAR(255) UNIQUE,
    webhook_url VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ACTIVE'
);

-- 3. PRODUCTS & INVENTORY
CREATE TABLE IF NOT EXISTS esim_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id VARCHAR(50) NOT NULL, -- e.g. 'AIRALO', 'TRUPHONE'
    vendor_package_code VARCHAR(100) NOT NULL, -- Code to map with Vendor API
    name VARCHAR(255) NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    data_limit_gb INTEGER, -- NULL means Unlimited
    duration_days INTEGER NOT NULL,
    price_usd DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ORDERS & PROVISIONING
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'ORD-20260703-1234'
    user_id UUID REFERENCES users(id),
    b2b_partner_id UUID REFERENCES b2b_partners(id), -- Null if direct customer
    package_id UUID REFERENCES esim_packages(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PAID, PROVISIONING, DELIVERED, FAILED_API
    payment_intent_id VARCHAR(255),
    iccid VARCHAR(50), -- Assigned by Vendor
    qr_code_url TEXT,
    vendor_reference_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. AUDIT LOGS (Admin & Security)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255),
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
