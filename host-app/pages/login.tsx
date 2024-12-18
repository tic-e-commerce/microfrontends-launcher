import dynamic from "next/dynamic";
import Image from "next/image";
import BannerLogin from "@/public/images/banner_login.png";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DynamicLoginForm = dynamic(() => import("auth/LoginForm"), {
  ssr: false,
  loading: () => <p>Cargando el formulario...</p>,
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
      <Header />
      <div className="p-0 m-0">
        <div className="row p-0 m-0">
          <div className="col-12 col-md-6 p-0 m-0">
            <Image src={BannerLogin} alt="Banner Login" className="img-fluid" />
          </div>
          <div className="col-12 col-md-6 p-0 m-0">
            <DynamicLoginForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
