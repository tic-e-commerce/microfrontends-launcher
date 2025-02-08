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
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [shippingMethod, setShippingMethodState] = useState<string | null>(
    null
  );
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setError("Authorization token not found.");
        setTimeout(() => router.push("/login"), 500);
        return;
      }

      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await getCartByUserId(token as string);

        if (!response.data) {
          setError("Failed to fetch cart items.");
          return;
        }

        const { cart, shipping_method, shipping_cost, subtotal, total } =
          response.data;

        setCartItems(cart || []);
        setShippingMethodState(shipping_method || "Standard");
        setShippingCost(shipping_cost ?? 0);
        setSubtotal(subtotal ?? 0);
        setTotal(total ?? subtotal + (shipping_cost ?? 0));
      } catch (err) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (!cartItems) return;
    const newSubtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + shippingCost);
  }, [cartItems, shippingCost]);

  const handleQuantityChange = async (product_id: number, quantity: number) => {
    if (!token) return;

    const validatedQuantity = Math.max(quantity, 1);

    try {
      await updateCart(product_id, validatedQuantity, token);

      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product_id === product_id
            ? { ...item, quantity: validatedQuantity }
            : item
        )
      );
    } catch (err: any) {
      const product = cartItems.find((item) => item.product_id === product_id);
      setError(
        err.response?.data?.message ||
          `Failed to update ${product?.product_name}.`
      );
      setTimeout(() => setError(null), 2000);
    }
  };

  const handleRemoveItem = async (product_id: number) => {
    if (!token) return;

    try {
      await removeProductFromCart(product_id, token);

      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.product_id !== product_id)
      );
      setSuccess("Product removed from cart.");
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError("Failed to remove item.");
      setTimeout(() => setError(null), 2000);
    }
  };

  const handleShippingMethodChange = async (selectedMethod: string) => {
    setShippingMethodState(selectedMethod);

    if (!token) return;

    try {
      await setShippingMethod({ shipping_method: selectedMethod }, token);

      const response = await getCartByUserId(token);
      const { cart, shipping_method, shipping_cost, subtotal, total } =
        response.data;

      setCartItems(cart || []);
      setShippingMethodState(shipping_method || "Standard");
      setShippingCost(shipping_cost ?? 0);
      setSubtotal(subtotal ?? 0);
      setTotal(total ?? subtotal + (shipping_cost ?? 0));
    } catch (err) {
      setError("Failed to update shipping method.");
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (!isAuthenticated) return <p>Redirecting to login...</p>;
  if (loading) return <p>Loading cart items...</p>;

  return (
    <div className={`${styles.cartContainer} container`}>
      <div className={styles.messageContainer}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
      </div>

      <div className="row">
        {cartItems.length === 0 ? (
          <div className="col-md-12 text-center">
            <h5>Your cart is empty</h5>
            <p>Browse our products and add items to your cart.</p>
            <div className="mt-4">
              <a href="/products" className={`${styles.shopNowButton} btn`}>
                Shop Now
              </a>
            </div>
          </div>
        ) : (
          <div className="col-md-12 d-flex flex-column">
            <CartTable
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
            <CartSummary
              subtotal={subtotal}
              shippingMethod={shippingMethod}
              shippingCost={shippingCost}
              total={total}
              onShippingMethodChange={handleShippingMethodChange}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;