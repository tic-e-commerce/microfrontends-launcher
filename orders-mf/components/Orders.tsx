import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createOrder, getOrder, cancelOrder } from "@/services/orders.service";
import { OrderDetails as OrderDetailsType } from "@/interfaces/order-details.interface";
import OrderDetailsComponent from "./OrderDetails";
import OrderSummary from "./OrderSummary";
import CancelOrderModal from "./CancelOrderModal";

const Orders: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [expirationMessage, setExpirationMessage] = useState<string | null>(null);
  const router = useRouter();

  const isUnauthorized = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("order_id");
    localStorage.removeItem("order_status");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      console.warn("🔒 User not authenticated. Redirecting to login...");
      isUnauthorized();
      return;
    }
  }, []);

  useEffect(() => {
    const fetchAndCheckOrder = async (orderId: string, token: string) => {
      try {
        const orderDetailsResponse = await getOrder(orderId, token);
        const orderData = orderDetailsResponse.data;
        setOrderDetails(orderData);

        if (orderData.status === "EXPIRED") {
          setIsExpired(true);
          localStorage.setItem("order_status", "EXPIRED");
          setExpirationMessage(
            "⏳ The order expired while you were on this page."
          );
        } else {
          setIsExpired(false);
          localStorage.setItem("order_status", "ACTIVE");
        }
      } catch (err: any) {
        if (err?.response?.status === 401) {
          console.warn("⛔ Token expired or invalid. Redirecting...");
          isUnauthorized();
        } else {
          setError(
            "⚡ An error occurred. Please refresh the page to generate a new order."
          );
        }
      }
    };

    const createNewOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsExpired(false);
        localStorage.setItem("order_status", "ACTIVE");

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        if (!token || !userId) {
          isUnauthorized();
          return;
        }

        localStorage.removeItem("order_id");
        const createOrderDto = { user_id: parseInt(userId, 10) };
        const response = await createOrder(createOrderDto, token);
        const newOrderId = response.data.order_id;
        localStorage.setItem("order_id", newOrderId);

        await fetchAndCheckOrder(newOrderId, token);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          isUnauthorized();
        } else {
          setError(
            "⚡ Unable to create order. Please refresh the page to try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    createNewOrder();
  }, []);

  useEffect(() => {
    const checkOrderExpiration = async () => {
      const token = localStorage.getItem("token");
      const orderId = localStorage.getItem("order_id");

      if (!token || !orderId) {
        isUnauthorized();
        return;
      }

      try {
        const orderDetailsResponse = await getOrder(orderId, token);
        const updatedOrderData = orderDetailsResponse.data;
        setOrderDetails(updatedOrderData);

        if (updatedOrderData.status === "EXPIRED" && !isExpired) {
          setIsExpired(true);
          localStorage.setItem("order_status", "EXPIRED");
          setExpirationMessage(
            "⏳ The order expired while you were on this page."
          );
        } else if (updatedOrderData.status !== "EXPIRED") {
          localStorage.setItem("order_status", "ACTIVE");
        }
      } catch (err: any) {
        if (err?.response?.status === 401) {
          isUnauthorized();
        } else {
          setError(
            "⚡ Could not check order status. Refresh the page to try again."
          );
        }
      }
    };

    const interval = setInterval(checkOrderExpiration, 60000);
    return () => clearInterval(interval);
  }, [isExpired]);

  const handleCancelOrder = async () => {
    const token = localStorage.getItem("token");
    const orderId = localStorage.getItem("order_id");

    if (!token || !orderId) {
      isUnauthorized();
      return;
    }

    try {
      const orderDetailsResponse = await getOrder(orderId, token);
      const updatedOrderData = orderDetailsResponse.data;
      setOrderDetails(updatedOrderData);

      if (updatedOrderData.status === "EXPIRED") {
        setIsExpired(true);
        localStorage.setItem("order_status", "EXPIRED");
        setExpirationMessage(
          "⏰ This order has already expired and cannot be canceled."
        );
        setError("This order has already expired and cannot be canceled.");
        return;
      }

      await cancelOrder(orderId, token);
      localStorage.removeItem("order_id");
      localStorage.removeItem("cart_hash");
      localStorage.removeItem("order_status");
      router.push("/cart");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        isUnauthorized();
      } else {
        setError(
          "⚡ Failed to cancel order. Please refresh the page to try again."
        );
      }
    }
  };

  const renderErrorWithReload = () => (
    <div className="alert alert-danger text-center">
      ⚡ Unable to create order. Please refresh the page to try again.
      <div className="d-flex justify-content-center mt-3">
        <button
          className="custom-btn custom-btn-danger text-white px-4 py-2"
          style={{
            borderRadius: "2px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={() => window.location.reload()}
        >
          🔄 Refresh Page
        </button>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading order details...</span>
          </div>
          <p className="loading-text">
            We are retrieving your order details. Please wait...
          </p>
        </div>
      </div>
    );

  if (error) return renderErrorWithReload();
  if (
    !orderDetails ||
    !orderDetails.order_items ||
    orderDetails.order_items.length === 0
  )
    return (
      <div className="alert alert-warning">No order details available.</div>
    );

  return (
    <div className="orders-wrapper mt-5">
      <div className="order-card">
        <div className="card order-details shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title">Order Details</h5>

            {isExpired && (
              <div className="alert alert-warning text-center">
                ⏳ <strong>Oops! Your order has expired.</strong>
                <p>
                  It seems that the order expired while you were on this page. <br />
                  👉 <strong>Please reload the page to create a new order and continue.</strong>
                </p>
                <button
                  className="custom-btn custom-btn-danger text-white mt-2 px-4 py-2"
                  onClick={() => window.location.reload()}
                >
                  🔄 Create New Order
                </button>
              </div>
            )}

            <OrderDetailsComponent orderItems={orderDetails.order_items} />

            <OrderSummary
              subtotal={orderDetails.subtotal ?? orderDetails.total_amount}
              shippingCost={orderDetails.shipping_cost ?? 0}
              shippingMethod={
                orderDetails.shipping_cost === 0
                  ? "Free"
                  : orderDetails.shipping_cost === 7.99
                  ? "Express"
                  : "Standard"
              }
              total={orderDetails.total ?? orderDetails.total_amount}
            />

            {!isExpired && (
              <button
                className="custom-btn custom-btn-secondary custom-btn-cancel-order"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>

      {showCancelModal && (
        <CancelOrderModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelOrder}
        />
      )}
    </div>
  );
};

export default Orders;
