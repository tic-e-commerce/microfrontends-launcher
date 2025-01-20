import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicCart = dynamic(
  () => import("cart/Cart"), 
  {
    ssr: false, 
    loading: () => <p>Cargando el carrito...</p>, 
  }
);

const Cart = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
    const checkRemote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_CART_URL}`, { 
          method: "HEAD",
        });

        if (!res.ok) {
          console.error(`Error: Server responded with status ${res.status}`);
          setRemoteAvailable(false);
        }
      } catch (error) {
        console.error("Error connecting to the remote server:", error);
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
          <DynamicCart />
        ) : (
          <p>No se pudo conectar con el servidor remoto. Intente más tarde.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
