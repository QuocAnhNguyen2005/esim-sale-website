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
