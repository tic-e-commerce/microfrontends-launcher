import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicOrders = dynamic(() => import("orders/Orders"), {
  ssr: false,
  loading: () => <p>Cargando el módulo de órdenes...</p>,
});

const DynamicPayments = dynamic(() => import("payments/Payments"), {
  ssr: false,
  loading: () => <p>Cargando el módulo de pagos...</p>,
});

const OrdersAndPayments = () => {
  const [remoteOrdersAvailable, setRemoteOrdersAvailable] = useState(true);
  const [remotePaymentsAvailable, setRemotePaymentsAvailable] = useState(true);

  useEffect(() => {
    const checkOrdersRemote = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_ORDERS_URL}`,
          {
            method: "HEAD",
          }
        );
        if (!res.ok) setRemoteOrdersAvailable(false);
      } catch (error) {
        setRemoteOrdersAvailable(false);
      }
    };

    const checkPaymentsRemote = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_PAYMENTS_URL}`,
          {
            method: "HEAD",
          }
        );
        if (!res.ok) setRemotePaymentsAvailable(false);
      } catch (error) {
        setRemotePaymentsAvailable(false);
      }
    };

    checkOrdersRemote();
    checkPaymentsRemote();
  }, []);

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  return (
    <div>
      <Header />
      <div className="container my-4">
        <div className="breadcrumb mb-3 text-secondary">
          <span
            className="text-decoration-none cursor-pointer"
            onClick={() => handleRedirect("/account")}
          >
            Account
          </span>
          <span className="mx-2">/</span>

          <span
            className="text-decoration-none cursor-pointer"
            onClick={() => handleRedirect("/profile")}
          >
            My Account
          </span>
          <span className="mx-2">/</span>

          <span
            className="text-decoration-none cursor-pointer"
            onClick={() => handleRedirect("/product")}
          >
            Product
          </span>
          <span className="mx-2">/</span>

          <span
            className="text-decoration-none cursor-pointer"
            onClick={() => handleRedirect("/cart")}
          >
            View Cart
          </span>
          <span className="mx-2">/</span>

          <span className="text-decoration-none text-dark ">CheckOut</span>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ flex: 1 }}>
            {remotePaymentsAvailable ? (
              <DynamicPayments />
            ) : (
              <p>No se pudo conectar con el servidor remoto de pagos.</p>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {remoteOrdersAvailable ? (
              <DynamicOrders />
            ) : (
              <p>No se pudo conectar con el servidor remoto de órdenes.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersAndPayments;
