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
    order_items: {
      order_item_id: string;
      order_id: string;
      product_id: number;
      quantity: number;
      price: string;
      product_name: string;
      image_url: string;
      created_at: string;
      updated_at: string;
    }[];
    subtotal: number;
    shipping_cost: number; 
    total: number;
  }
  