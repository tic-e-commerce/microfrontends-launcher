import React, { useEffect, useState } from "react";
import { createOrder, getOrder, cancelOrder } from "@/services/orders.service";

interface Order {
  order_id: string;
  status: string;
  items: { name: string; quantity: number; price: number }[];
}

const Orders: React.FC<{ userId: string }> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async (orderId: string) => {
    try {
      setLoading(true);
      const response = await getOrder(orderId);
      setOrders([response.data]); // Simula la carga de una orden
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrder(orderId);
      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (err) {
      setError("Failed to cancel order.");
    }
  };

  const handleCreateOrder = async () => {
    try {
      const newOrder = {
        user_id: userId,
        items: [
          { name: "Sample Item", quantity: 1, price: 100 }, // Cambia con datos reales
        ],
      };
      await createOrder(newOrder);
      setOrders([...orders, { ...newOrder, order_id: "123", status: "created" }]); // Simula una nueva orden
    } catch (err) {
      setError("Failed to create order.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Orders</h1>
      <button onClick={handleCreateOrder}>Create Order</button>
      {orders.map((order) => (
        <div key={order.order_id}>
          <h2>Order ID: {order.order_id}</h2>
          <p>Status: {order.status}</p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={() => handleCancelOrder(order.order_id)}>Cancel Order</button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
