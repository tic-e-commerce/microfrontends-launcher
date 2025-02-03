import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import Link from "next/link";
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

  //   <div>
  //     <Header />
  //     <div className="container my-4">
  //       {/* Breadcrumb */}
  //       <div className="mb-3">
  //         <Link href="/" passHref>
  //           <a className="text-secondary text-decoration-none">Account</a>
  //         </Link>
  //         <span className="mx-2">/</span>
  //         <Link href="/my-account" passHref>
  //           <a className="text-secondary text-decoration-none">My Account</a>
  //         </Link>
  //         <span className="mx-2">/</span>
  //         <Link href="/product" passHref>
  //           <a className="text-secondary text-decoration-none">Product</a>
  //         </Link>
  //         <span className="mx-2">/</span>
  //         <Link href="/view-cart" passHref>
  //           <a className="text-secondary text-decoration-none">View Cart</a>
  //         </Link>
  //         <span className="mx-2">/</span>
  //         <span className="text-dark">CheckOut</span>
  //       </div>

  //       {/* Main Content */}
  //       <div
  //         style={{
  //           display: "flex",
  //           alignItems: "flex-start",
  //           justifyContent: "space-between",
  //           gap: "20px",
  //         }}
  //       >
  //         <div style={{ flex: 1 }}>
  //           {remotePaymentsAvailable ? (
  //             <DynamicPayments />
  //           ) : (
  //             <p>No se pudo conectar con el servidor remoto de pagos.</p>
  //           )}
  //         </div>

  //         <div style={{ flex: 1 }}>
  //           {remoteOrdersAvailable ? (
  //             <DynamicOrders />
  //           ) : (
  //             <p>No se pudo conectar con el servidor remoto de órdenes.</p>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //     <Footer />
  //   </div>
  // );
  return (
    <div>
      <Header />
      <div className="container my-4">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-3">
          <Link href="/login" passHref>
            <a className="text-muted" style={{ textDecoration: "none" }}>Account</a>
          </Link>
          <span className="mx-2 text-muted">/</span>
          <Link href="/profile" passHref>
            <a className="text-muted" style={{ textDecoration: "none" }}>My Account</a>
          </Link>
          <span className="mx-2 text-muted">/</span>
          <Link href="/product" passHref>
            <a className="text-muted" style={{ textDecoration: "none" }}>Product</a>
          </Link>
          <span className="mx-2 text-muted">/</span>
          <Link href="/cart" passHref>
            <a className="text-muted" style={{ textDecoration: "none" }}>View Cart</a>
          </Link>
          <span className="mx-2 text-muted">/</span>
          <span className="text-dark" style={{ fontWeight: "normal" }}>CheckOut</span>
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
