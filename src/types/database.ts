export interface Vendor {
  id: string;
  name: string;
  api_endpoint?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  country_code: string;
  data_limit_gb: number | null; // null means unlimited
  duration_days: number;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'PAID' | 'PROVISIONING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

/*
  DATABASE OPTIMIZATION NOTE:
  - Table "orders": You should create an INDEX on "created_at" column to optimize
    the History Page filters and Admin Dashboard queries.
    SQL: CREATE INDEX idx_orders_created_at ON orders(created_at);
*/
export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: OrderStatus;
  payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
}

export type EsimStatus = 'AVAILABLE' | 'RESERVED' | 'ASSIGNED' | 'ACTIVATED' | 'EXPIRED';

/*
  DATABASE OPTIMIZATION NOTE:
  - Table "esim_profiles": You should create an INDEX on "status" column 
    since it's frequently used for filtering in Dashboard/My eSIMs.
    SQL: CREATE INDEX idx_esim_profiles_status ON esim_profiles(status);
*/
export interface EsimProfile {
  id: string;
  vendor_id: string;
  product_id: string;
  order_item_id?: string;
  iccid: string;
  lpa_string?: string;
  qr_code_url?: string;
  status: EsimStatus;
  assigned_at?: string;
  created_at: string;
  updated_at: string;
}

// ==========================================
// ADMIN & ENTERPRISE RBAC SYSTEM
// ==========================================

export type UserRole = 'SUPER_ADMIN' | 'FINANCE' | 'SUPPORT';

export interface AdminProfile {
  id: string; // references auth.users(id)
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

// AUDIT LOGS (Tự động ghi lại bằng Trigger PostgreSQL)
export interface AuditLog {
  id: string;
  admin_id: string;
  action_type: string; // VD: 'REFUND_ORDER', 'UPDATE_PRICE'
  table_name: string;
  record_id: string;
  old_data: any;
  new_data: any;
  ip_address: string;
  created_at: string;
}
