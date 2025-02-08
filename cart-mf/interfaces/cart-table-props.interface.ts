import { CartItem } from "./cart-item.interface";

export interface CartTableProps {
  cartItems: CartItem[];
  onQuantityChange: (product_id: number, quantity: number) => void;
  onRemoveItem: (product_id: number) => void;
}
