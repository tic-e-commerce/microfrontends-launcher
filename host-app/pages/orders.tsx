import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicOrders = dynamic(
  () => import("orders/Orders"), 
  {
    ssr: false, 
    loading: () => <p>Cargando el módulo de órdenes...</p>, 
  }
);

const Orders = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
    const checkRemote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_ORDERS_URL}`, {
          method: "HEAD",
        });

        if (!res.ok) {
          setRemoteAvailable(false);
        }
      } catch (error) {
        setRemoteAvailable(false);
      }
    };

    checkRemote();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {remoteAvailable ? (
          <DynamicOrders />
        ) : (
          <p>No se pudo conectar con el servidor remoto de pagos. Intente más tarde.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
