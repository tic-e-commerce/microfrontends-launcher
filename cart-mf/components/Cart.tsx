import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/cart.module.css";
import {
  getCartByUserId,
  updateCart,
  removeProductFromCart,
} from "@/services/cart.service";
import { CartItem } from "@/interfaces/cart-item.interface";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   try {
  //     const storedUserId = localStorage.getItem("user_id");
  //     if (!storedUserId) {
  //       setError("User ID not found.");
  //       router.push("/login");
  //     } else {
  //       setUserId(storedUserId);
  //     }
  //   } catch {
  //     setError("Failed to access the user ID.");
  //     router.push("/login");
  //   }
  // }, [router]);
  useEffect(() => {
    // Comentar la redirección mientras pruebas la interfaz
    const storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) {
      setUserId("1"); // Usar un ID de usuario simulado
    } else {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    // if (!userId) {
    //   router.push("/login");
    //   return;
    // }

    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await getCartByUserId(Number(userId));
        setCartItems(response.data);
      } catch (err: any) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleQuantityChange = async (productId: number, quantity: number) => {
    if (!userId) return;

    try {
      await updateCart(Number(userId), productId, quantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      );
      setSuccess("Cart updated successfully!");
    } catch (err) {
      setError("Failed to update quantity.");
    }
  };

  const handleRemoveItem = async (productId: number) => {
    if (!userId) return;

    try {
      await removeProductFromCart(Number(userId), productId);
      setCartItems((prev) =>
        prev.filter((item) => item.product_id !== productId)
      );
      setSuccess("Item removed successfully!");
    } catch (err) {
      setError("Failed to remove item.");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? "Free" : 0;

  const handleCheckout = () => {
    // ruta orders-mf
    router.push("http://localhost:3005/orders");
  };

  if (!userId) return <p>Redirecting to login...</p>;
  if (loading) return <p>Loading cart items...</p>;

  return (
    <div className={styles.cartContainer}>
      <h1 className="text-center mb-4">Shopping Cart</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tabla del carrito */}
      <div className={styles.cartContent}>
        <table className={`table ${styles.cartTable}`}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th> {/*  botón de eliminar */}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product_id}>
                <td className={styles.imageColumn}>
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className={styles.productImage}
                  />
                </td>
                <td>{item.product_name}</td>
                <td>${item.price}</td>
                <td>
                  <div className={styles.quantityControls}>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        handleQuantityChange(item.product_id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        handleQuantityChange(item.product_id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${item.price * item.quantity}</td>
                <td className={styles.removeColumn}>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.product_id)}
                    className={`btn btn-sm btn-outline-danger ${styles.removeButton}`}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón Return to Shop */}
      <div className={styles.returnToShopContainer}>
        <button
          className="btn btn-outline-secondary"
          onClick={() => router.push("/shop")}
        >
          Return to shop
        </button>
      </div>

      {/* Cuadro de "Cart Total" */}
      <div className={styles.cartSummaryWrapper}>
        <div className={`mt-2 ${styles.cartSummary}`}>
          <h2>Cart Total</h2>
          <p>
            <strong>Subtotal:</strong> ${subtotal}
          </p>
          <p>
            <strong>Shipping:</strong> {shipping}
          </p>
          <p>
            <strong>Total:</strong> ${subtotal}
          </p>
          <button
            className={`btn btn-danger ${styles.checkoutButton}`}
            onClick={handleCheckout}
          >
            Process to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
