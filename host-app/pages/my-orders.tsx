import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// ✅ Importación dinámica del componente PaidOrders
const DynamicPaidOrders = dynamic(() => import("orders/PaidOrders"), {
  ssr: false,
  loading: () => <p>Loading your paid order...</p>,
});

const MyOrders = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
    const checkRemote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_ORDERS_URL}`, {
          method: "HEAD",
        });
        if (!res.ok) setRemoteAvailable(false);
      } catch {
        setRemoteAvailable(false);
      }
    };
    checkRemote();
  }, []);

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="mb-3 text-secondary">
          <span
            className="text-decoration-none text-secondary cursor-pointer"
            onClick={() => handleRedirect("/products")}
          >
            Home
          </span>
          <span className="mx-1">/</span>
          <span
            className="text-decoration-none text-secondary cursor-pointer"
            onClick={() => handleRedirect("/profile")}
          >
            My Account
          </span>
          <span className="mx-1">/</span>
          <span className="text-decoration-none text-dark">
            My Paid Orders
          </span>
        </div>

        {remoteAvailable ? (
          <DynamicPaidOrders />
        ) : (
          <p>No se pudo cargar la orden. Intente más tarde.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;
