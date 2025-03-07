import { useEffect, useState } from "react";
import { Product } from "@/models";
import ProductCard from "../product-card/product-card.component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./products-list.module.css";
import { getProducts } from "@/services/products.service";

interface ProductsListProps {
  title: string;
  showViewAllButton?: boolean; // Nueva prop
}

const ProductsList = ({ title, showViewAllButton = true }: ProductsListProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Función para seleccionar 5 productos aleatorios
  const getRandomProducts = (products: Product[]) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        const randomProducts = getRandomProducts(allProducts);
        setProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.productsContainer}>
      {/* Título */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">{title}</h3>
      </div>

      {/* Swiper */}
      <Swiper
        slidesPerView={4} // Mostrar 4 productos por fila
        spaceBetween={20} // Separación entre productos
        navigation={true} // Flechas de navegación
        modules={[Navigation]}
        className={styles.productsSwiper}
        breakpoints={{
          // Configuración responsiva
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.product_id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botón "View All Products" */}
      {showViewAllButton && (
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-danger">View All Products</button>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
