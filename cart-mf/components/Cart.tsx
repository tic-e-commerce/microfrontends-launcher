import React, { useEffect, useState } from "react";
import { getCartByUserId, removeProductFromCart, updateCart } from "@/services/cart.service";

interface CartItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

const Cart: React.FC<{ userId: number }> = ({ userId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await getCartByUserId(userId);
        setCartItems(response.data);
      } catch (err) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleRemove = async (productId: number) => {
    try {
      await removeProductFromCart(userId, productId);
      setCartItems(cartItems.filter((item) => item.product_id !== productId));
    } catch {
      setError("Failed to remove item.");
    }
  };

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    try {
      await updateCart(userId, productId, quantity);
      setCartItems(
        cartItems.map((item) =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      );
    } catch {
      setError("Failed to update quantity.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Cart</h1>
      {cartItems.map((item) => (
        <div key={item.product_id} className="d-flex align-items-center">
          <p>{item.product_name}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleUpdateQuantity(item.product_id, parseInt(e.target.value))}
          />
          <button onClick={() => handleRemove(item.product_id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
