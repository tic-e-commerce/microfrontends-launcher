import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicPayments = dynamic(
  () => import("payments/Payments"), 
  {
    ssr: false, 
    loading: () => <p>Cargando el módulo de pagos...</p>, 
  }
);

const Payments = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
    const checkRemote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_PAYMENTS_URL}`, {
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
          <DynamicPayments />
        ) : (
          <p>No se pudo conectar con el servidor remoto de pagos. Intente más tarde.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payments;
