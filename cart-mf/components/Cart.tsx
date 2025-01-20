import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/cart.module.css";
import {
  getCartByUserId,
  updateCart,
  removeProductFromCart,
  setShippingMethod,
} from "@/services/cart.service";
import { CartItem } from "@/interfaces/cart-item.interface";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user_id, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [shippingMethod, setShippingMethodState] = useState<string | null>(
    null
  );
  const [shippingCost, setShippingCost] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const storedToken = localStorage.getItem("token");

    if (!storedUserId || !storedToken) {
      setError("User ID or authorization token not found.");
      router.push("/login");
      return;
    }

    setUserId(storedUserId);
    setToken(storedToken);

    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await getCartByUserId(storedUserId, storedToken);
        const { cart, shipping_method, shipping_cost } = response.data;

        // Actualiza los estados con los datos del backend
        setCartItems(cart);
        setShippingMethodState(shipping_method);
        setShippingCost(shipping_cost); // Actualiza el costo de envío
      } catch (err) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const isUnauthorized = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleQuantityChange = async (product_id: number, quantity: number) => {
    if (!user_id || !token) return;
  
    try {
      await updateCart(Number(user_id), product_id, quantity, token);
      setCartItems((prev) =>
        prev.map((item) =>
          item.product_id === product_id ? { ...item, quantity } : item
        )
      );
      setSuccess("Cart updated successfully!");
  
      // Desaparece automáticamente después de 3 segundos
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      if (err.response?.status === 400 && err.response?.data?.message) {
        // Muestra el mensaje detallado del backend
        setError(err.response.data.message);
      } else {
        // Mensaje genérico para otros errores
        setError("Failed to update quantity.");
      }
  
      // Desaparece automáticamente después de 3 segundos
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  

  const handleRemoveItem = async (product_id: number) => {
    if (!user_id || !token) return;

    try {
      await removeProductFromCart(Number(user_id), product_id, token);
      setCartItems((prev) =>
        prev.filter((item) => item.product_id !== product_id)
      );
      setSuccess("Item removed successfully!");

      // Desaparece automáticamente después de 3 segundos
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError("Failed to remove item.");
    }
  };

  const handleShippingMethodChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedMethod = event.target.value;
    setShippingMethodState(selectedMethod);
  
    if (!user_id || !token || !selectedMethod) {
      setError("Please select a shipping method.");
      return;
    }
  
    try {
      await setShippingMethod(
        { user_id: Number(user_id), shipping_method: selectedMethod },
        token
      );
  
      const response = await getCartByUserId(user_id, token);
      const { cart, shipping_method, shipping_cost } = response.data;
  
      setCartItems(cart);
      setShippingMethodState(shipping_method);
      setShippingCost(shipping_cost);
    } catch (err) {
      setError("Failed to update shipping method.");
    }
  };
  

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    router.push("http://localhost:3009/orders");
  };

  if (!user_id || !token) return <p>Redirecting to login...</p>;
  if (loading) return <p>Loading cart items...</p>;

  return (
    <div className={`${styles.cartContainer} container`}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row">
        <div className="col-md-12 d-flex flex-column">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product_id}>
                  <td className="product-column">
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className={styles.productImage}
                    />
                    <span>{item.product_name}</span>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <div className="quantity-container">
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button
                      className={`${styles.removeButton}`}
                      onClick={() => handleRemoveItem(item.product_id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="action-buttons">
            <button
              className="btn btn-return-to-shop"
              onClick={() => router.push("/shop")}
            >
              Return to shop
            </button>
            <button
              className="btn btn-process-checkout"
              onClick={handleCheckout}
            >
              Process to checkout
            </button>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Select Shipping Method</h5>
                  <select
                    className="form-select"
                    aria-label="Select shipping method"
                    value={shippingMethod || ""}
                    onChange={handleShippingMethodChange}
                  >
                    <option value="STANDARD">Standard</option>
                    <option value="EXPRESS">Express</option>
                    <option value="STORE">Store</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cart Total</h5>
                  <table className="summary-table">
                    <tbody>
                      <tr>
                        <td>Subtotal:</td>
                        <td>${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Shipping:</td>
                        <td>
                          {shippingMethod
                            ? `${shippingMethod
                                .replace("_", " ")
                                .toUpperCase()} ($${shippingCost.toFixed(2)})`
                            : "Not selected"}
                        </td>
                      </tr>
                      <tr>
                        <td>Total:</td>
                        <td>${total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    className="btn btn-danger w-100 mt-3"
                    onClick={handleCheckout}
                  >
                    Process to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;