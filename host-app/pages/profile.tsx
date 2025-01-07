import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicUpdateProfileForm = dynamic(
  () => import("profile/UpdateProfileForm"),
  {
    ssr: false, // Los módulos remotos no funcionan bien con SSR
    loading: () => <p>Cargando el formulario...</p>, // Loader mientras se carga
  }
);

const DynamicChangePasswordForm = dynamic(
  () => import("profile/ChangePasswordForm"),
  {
    ssr: false, // Los módulos remotos no funcionan bien con SSR
    loading: () => <p>Cargando el formulario...</p>, // Loader mientras se carga
  }
);

const Profile = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fullName = localStorage.getItem("full_name");
    if (fullName) {
      setFullName(fullName);
    }
    const checkRemote = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_PROFILE_URL}`,
          {
            method: "HEAD",
          }
        );

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
      <div className="container my-5">
        <div className="d-flex justify-content-between items-center">
          <div>
            <span className="text-secondary">Home /</span>
            <span className="mx-1">My Account</span>
          </div>
          <div>
            Welcome! <span className="text-primary">{fullName}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-8">
            {remoteAvailable ? (
              <div>
                <DynamicUpdateProfileForm />
                <DynamicChangePasswordForm />
              </div>
            ) : (
              <p>
                No se pudo conectar con el servidor remoto. Intente más tarde.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
