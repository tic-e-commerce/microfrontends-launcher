import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createOrder, getOrder, cancelOrder } from "@/services/orders.service";
import { OrderDetails } from "@/interfaces/order-details.interface";
import OrderDetailsComponent from "./OrderDetails";
import OrderSummary from "./OrderSummary";
import CancelOrderModal from "./CancelOrderModal"; // Nuevo componente separado

const Orders: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOrCreateOrder = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        let storedOrderId = localStorage.getItem("order_id");

        if (!token) {
          setError("Authorization token not found.");
          router.push("/login");
          return;
        }

        if (!userId) {
          setError("User ID not found in localStorage.");
          return;
        }

        if (storedOrderId) {
          try {
            const existingOrder = await getOrder(storedOrderId, token);

            if (
              existingOrder.data.status === "EXPIRED" ||
              existingOrder.data.status === "CANCELLED"
            ) {
              localStorage.removeItem("order_id");
              storedOrderId = null;
            } else {
              setOrderDetails(existingOrder.data);
              setLoading(false);
              return;
            }
          } catch (error) {
            localStorage.removeItem("order_id");
            storedOrderId = null;
          }
        }

        if (!storedOrderId) {
          const createOrderDto = { user_id: parseInt(userId, 10) };
          const response = await createOrder(createOrderDto, token);
          const newOrderId = response.data.order_id;

          localStorage.setItem("order_id", newOrderId);

          const orderDetailsResponse = await getOrder(newOrderId, token);
          setOrderDetails(orderDetailsResponse.data);
        }
      } catch (err) {
        setError("Failed to create or fetch order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateOrder();
  }, []);

  const handleCancelOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const orderId = localStorage.getItem("order_id");

      if (!token || !orderId) {
        setError("No order to cancel.");
        return;
      }

      await cancelOrder(orderId, token);

      localStorage.removeItem("order_id");
      localStorage.removeItem("cart_hash");

      router.push("/cart");
    } catch (err) {
      setError("Failed to cancel order.");
    }
  };

  if (loading) return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading order details...</span>
        </div>
        <p className="loading-text">We are retrieving your order details. Please wait...</p>
      </div>
    </div>
  );
  
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!orderDetails) return <div className="alert alert-warning">No order details available.</div>;
  

  return (
    <div className="orders-wrapper mt-5">
      <div className="order-card">
        <div className="card order-details shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title">Order Details</h5>
            <OrderDetailsComponent orderItems={orderDetails.order_items ?? []} />
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
            <button className="btn btn-secondary btn-cancel-order" onClick={() => setShowCancelModal(true)}>
              Cancel Order
            </button>
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
