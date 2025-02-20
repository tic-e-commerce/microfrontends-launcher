import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getOrder } from "@/services/orders.service";
import { OrderDetails as OrderDetailsType } from "@/interfaces/order-details.interface";
import OrderDetailsComponent from "./OrderDetails";
import OrderSummary from "./OrderSummary";

const PaidOrders: React.FC = () => {
  const [paidOrder, setPaidOrder] = useState<OrderDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const isUnauthorized = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const storedToken = localStorage.getItem("token");

    if (!storedUserId || !storedToken) {
      isUnauthorized();
      return;
    }

    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const fetchPaidOrder = async () => {
      if (!isAuthenticated) return;

      const token = localStorage.getItem("token");
      const orderId = localStorage.getItem("order_id");

      if (!orderId) {
        setError("⚡ No tienes órdenes creadas.");
        setLoading(false);
        return;
      }

      try {
        const response = await getOrder(orderId, token as string);
        if (response.data.status === "PAID") {
          setPaidOrder(response.data);
        } else {
          setError("⚡ No tienes órdenes en estado 'PAID'.");
        }
      } catch {
        setError("⚡ Error al obtener la orden pagada.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaidOrder();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <p>🔒 Redirigiendo al login...</p>;
  if (loading) return <p>🔄 Cargando detalles de la orden pagada...</p>;
  if (error) return <p>{error}</p>;
  if (!paidOrder) return <p>⚡ No tienes órdenes en estado 'PAID'.</p>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">📦 Detalles de la Orden Pagada</h3>
      <OrderDetailsComponent orderItems={paidOrder.order_items} />
      <OrderSummary
        subtotal={paidOrder.subtotal ?? paidOrder.total_amount}
        shippingCost={paidOrder.shipping_cost ?? 0}
        shippingMethod={
          paidOrder.shipping_cost === 0
            ? "Free"
            : paidOrder.shipping_cost === 7.99
            ? "Express"
            : "Standard"
        }
        total={paidOrder.total ?? paidOrder.total_amount}
      />
    </div>
  );
};

export default PaidOrders;
