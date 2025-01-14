import React, { useEffect, useState } from "react";
import {
  GetFavoriteProducts,
  DeleteFavoriteProduct,
} from "../services/user-preferences.service";
import { useRouter } from "next/router";
import {
  FavoriteProduct,
  FavoriteProductFactory,
} from "@/models/favorite-product.model";
import FavoriteProductCard from "./FavoriteProductCard";
import Slider from "react-slick";

const FavoritesProducts = () => {
  const router = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  // Estado para productos favoritos
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>(
    []
  );
  // Estado para manejo de carga
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para manejo de errores
  const [error, setError] = useState<string | null>(null);
  // Estado para manejo del alerta
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "danger" | null>(null);

  // Usar useEffect para obtener user_id y token del local storage
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!user_id || !token) {
      router.push("/login");
      return;
    }

    const fetchFavoriteProducts = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        setError(null); // Reinicia cualquier error previo

        const response = await GetFavoriteProducts(user_id, token);
        const products = response.data.products.map(
          FavoriteProductFactory.fromJson
        );

        setFavoriteProducts(products);
      } catch (error: any) {
        if (error.response?.status === 401) {
          isUnauthorized();
        } else {
          setError("Ocurrió un error al cargar los productos favoritos.");
          console.error(error);
        }
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchFavoriteProducts();
  }, [router]);

  const isUnauthorized = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Función para eliminar el producto de favoritos
  const handleRemove = async (productId: number) => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!user_id || !token) {
      router.push("/login");
      return;
    }

    try {
      await DeleteFavoriteProduct(token, productId);
      setFavoriteProducts((prev) =>
        prev.filter((product) => product.favoriteProductId !== productId)
      );
      setAlertMessage("Producto eliminado de favoritos");
      setAlertType("success");
    } catch (error: any) {
      console.error("Error al eliminar el producto:", error);
      setAlertMessage("No se pudo eliminar el producto de favoritos.");
      setAlertType("danger");
    }
  };

  // Función para agregar el producto al carrito
  const handleAddToCart = (productId: number) => {
    console.log("Agregar al carrito el producto con id:", productId);
    // Aquí iría la lógica para agregar el producto al carrito
  };

  const handleAddAllToCart = () => {
    console.log("Agregar todos los productos al carrito");
    // Aquí iría la lógica para agregar todos los productos al carrito
  };

  // Cerrar el alerta automáticamente después de 3 segundos
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null); // Cerrar el alerta
      }, 3000);
      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [alertMessage]);

  return (
    <div className="my-3">
      {/* Mostrar el alerta de Bootstrap si hay un mensaje */}
      {alertMessage && (
        <div className="container">
          <div
            className={`alert alert-${alertType} alert-dismissible fade show`}
            role="alert">
            {alertMessage}
          </div>
        </div>
      )}

      {loading ? (
        <p>Cargando productos favoritos...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span>Wishlist ({favoriteProducts.length})</span>
            <span>
              <button
                className="btn btn-outline-dark border-secondary"
                onClick={handleAddAllToCart}>
                Move All to Bag
              </button>
            </span>
          </div>
          {favoriteProducts.length > 4 ? (
            <Slider {...settings}>
              {favoriteProducts.map((product) => (
                <FavoriteProductCard
                  key={product.favoriteProductId}
                  product={product}
                  onRemove={handleRemove} // Pasando la función de eliminar
                  onAddToCart={handleAddToCart} // Pasando la función de agregar al carrito
                />
              ))}
            </Slider>
          ) : (
            <div className="row">
              {favoriteProducts.map((product) => (
                <div key={product.favoriteProductId} className="col-3">
                  <FavoriteProductCard
                    product={product}
                    onRemove={handleRemove} // Pasando la función de eliminar
                    onAddToCart={handleAddToCart} // Pasando la función de agregar al carrito
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesProducts;
