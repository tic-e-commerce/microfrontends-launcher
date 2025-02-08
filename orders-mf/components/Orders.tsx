import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createOrder, getOrder, cancelOrder } from "@/services/orders.service";
import { OrderDetails } from "@/interfaces/order-details.interface";
import OrderDetailsComponent from "./OrderDetails";
import OrderSummary from "./OrderSummary";

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
              console.log(
                `Order ${storedOrderId} is ${existingOrder.data.status}, creating a new order.`
              );
              localStorage.removeItem("order_id");
              storedOrderId = null;
            } else {
              console.log(`Using existing order: ${storedOrderId}`);
              setOrderDetails(existingOrder.data);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.warn(
              `Could not fetch previous order ${storedOrderId}:`,
              error
            );
            localStorage.removeItem("order_id");
            storedOrderId = null;
          }
        }

        if (!storedOrderId) {
          console.log("Creating a new order...");
          const createOrderDto = { user_id: parseInt(userId, 10) };
          const response = await createOrder(createOrderDto, token);
          const newOrderId = response.data.order_id;

          localStorage.setItem("order_id", newOrderId);

          const orderDetailsResponse = await getOrder(newOrderId, token);
          setOrderDetails(orderDetailsResponse.data);
        }
      } catch (err) {
        console.error("Error creating or fetching order:", err);
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
      console.error("Error cancelling order:", err);
      setError("Failed to cancel order.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!orderDetails) return <p>No order details available.</p>;

  return (
    <div className="orders-wrapper mt-5">
      <div className="order-card">
        <div className="card order-details shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title">Order Details</h5>
            <OrderDetailsComponent
              orderItems={orderDetails.order_items ?? []}
            />
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
            {/* Botón para abrir el modal de cancelación */}
            <button
              className="btn btn-secondary btn-cancel-order"
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Are you sure you want to cancel this order?</h4>
            <p>Your selected items will remain in your cart.</p>
            <button className="btn btn-danger" onClick={handleCancelOrder}>
              Yes, Cancel Order
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowCancelModal(false)}
            >
              No, Keep Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;