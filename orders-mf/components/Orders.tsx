import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getOrder } from "@/services/orders.service";
import { OrderDetails } from "@/interfaces/order-details.interface";

const Orders: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [order_id, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedOrderId = localStorage.getItem("order_id");
    const token = localStorage.getItem("token");

    if (!storedOrderId || !token) {
      setError("Order ID or authorization token not found.");
      router.push("/login");
      return;
    }

    setOrderId(storedOrderId);
  }, [router]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!order_id) return;

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found.");
        router.push("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await getOrder(order_id, token);
        setOrderDetails(response.data);
      } catch (err: any) {
        console.error("Error fetching order details:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setError("Failed to fetch order details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order_id, router]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!orderDetails) return <p>No order details available.</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-center mb-4 text-uppercase">
                Order Details
              </h5>
              <ul className="list-group mb-4">
                {orderDetails.order_items.map((item) => (
                  <li
                    key={item.order_item_id}
                    className="list-group-item d-flex align-items-center"
                  >
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        marginRight: "15px",
                      }}
                    />
                    <div className="flex-grow-1">
                      <p className="mb-1">{item.product_name}</p>
                      <small>Quantity: {item.quantity}</small>
                    </div>
                    <div className="text-end">
                      <p className="mb-0">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <span>${orderDetails.shipping_cost.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping Method:</span>
                  <span>
                    {orderDetails.shipping_cost === 0
                      ? "Free"
                      : orderDetails.shipping_cost === 7.99
                      ? "Express"
                      : "Standard"}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="btn btn-danger w-100 mt-4"
                style={{
                  backgroundColor: "#e63946",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                  fontWeight: "normal",
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
