import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicLoginForm = dynamic(() => import("auth/LoginForm"), {
  ssr: false, // Los módulos remotos no funcionan bien con SSR
  loading: () => <p>Cargando el formulario...</p>, // Loader mientras se carga
});

const Login = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
    // Validar si el archivo remoteEntry.js está disponible
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

  return (
    <div>
      {remoteAvailable ? (
        <DynamicLoginForm />
      ) : (
        <p>No se pudo conectar con el servidor remoto. Intente más tarde.</p>
      )}
    </div>
  );
};

export default Login;
