import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicFavoritesProducts = dynamic(
  () => import("userPreferences/FavoritesProducts"),
  {
    ssr: false, // Los módulos remotos no funcionan bien con SSR
    loading: () => <p>Cargando el componente...</p>, // Loader mientras se carga
  }
);

const FavoriteProducts = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
    const checkRemote = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_USER_PREFERENCES_URL}`,
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
        <DynamicFavoritesProducts />
      ) : (
        <p>No se pudo conectar con el servidor remoto. Intente más tarde.</p>
      )}
    </div>
  );
};

export default FavoriteProducts;
