import React, { useEffect, useState } from "react";
import { getProductById } from "@/services/products.service";
import ProductActions from "./product-actions.component";
import ProductImages from "./product-images.component";
import ProductInfo from "./product-info.component";
import styles from "./styles.module.css";

interface ProductDetailProps {
  productId: number;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Cargando información del producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  const {
    product_name,
    price,
    rating = 0,
    reviews = 0, // Este valor inicial será dinámico
    stock = 0,
    description,
    image_url, // Imagen principal
  } = product;

  return (
    <div className={`container ${styles.productDetail}`}>
      <div className="row">
        <div className="col-md-6">
          <ProductImages mainImage={image_url} />
        </div>
        <div className="col-md-6">
          <ProductInfo
            title={product_name}
            rating={rating}
            reviews={reviews}
            stock={stock > 0}
            price={parseFloat(price) || 0} // Asegurar el manejo de precios como número
            description={description || "Descripción no disponible."}
          />
          <ProductActions />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
