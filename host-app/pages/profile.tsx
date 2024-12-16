import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicUpdateProfileForm = dynamic(
  () => import("profile/UpdateProfileForm"),
  {
    ssr: false, // Los módulos remotos no funcionan bien con SSR
    loading: () => <p>Cargando el formulario...</p>, // Loader mientras se carga
  }
);

const Profile = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
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
      {remoteAvailable ? (
        <DynamicUpdateProfileForm />
      ) : (
        <p>No se pudo conectar con el servidor remoto. Intente más tarde.</p>
      )}
    </div>
  );
};

export default Profile;
