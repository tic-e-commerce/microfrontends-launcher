import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DynamicForgotPasswordForm = dynamic(
  () => import("auth/ForgotPasswordForm"),
  {
    ssr: false,
    loading: () => <p>Cargando el formulario...</p>,
  }
);

const ResetPassword = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
    const checkRemote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_AUTH_URL}`, {
          method: "HEAD",
        });
        console.log(
          "process.env.NEXT_PUBLIC_REMOTE_AUTH_URL",
          process.env.NEXT_PUBLIC_REMOTE_AUTH_URL
        );
        console.log("res", res);
        if (!res.ok) {
          setRemoteAvailable(false);
        }
      } catch (error) {
        setRemoteAvailable(false);
      }
    };

    checkRemote();
  }, []);

  if (!remoteAvailable) {
    return (
      <p>El servicio de autenticación no está disponible en este momento.</p>
    );
  }
  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="w-50">
          <DynamicForgotPasswordForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
