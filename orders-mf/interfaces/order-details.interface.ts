import { OrderItem } from "./order-item.interface";

export interface OrderDetails {
  order_id: string;
  user_id: number;
  total_amount: number;
  total_items: number;
  status: string;
  paid: boolean;
  paid_at: string | null;
  stripe_charge_id: string | null;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[]; 
  subtotal: number;
  shipping_cost: number; 
  total: number;
}


