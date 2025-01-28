import {
  faHeart,
  faEye,
  faStar,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Product } from "@/models/Product";
import styles from "./product-card.module.css";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/products/${product.product_id}`);
  };

  return (
    <div className="card position-relative border-0 shadow-sm h-100 overflow-hidden">
      {/* Etiqueta de descuento o NEW */}
      <span
        className={`badge position-absolute top-0 start-0 m-2 ${
          product.discount ? "bg-danger" : "bg-success"
        }`}
      >
        {product.discount ? `-${product.discount}%` : "NEW"}
      </span>

      {/* Botones de acción */}
      <div className="position-absolute top-0 end-0 d-flex flex-column m-2">
        <button className="btn btn-light btn-sm mb-1 rounded-circle shadow">
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button className="btn btn-light btn-sm mb-1 rounded-circle shadow">
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button className="btn btn-primary btn-sm rounded-circle shadow">
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>

      {/* Imagen del producto (clicable) */}
      <img
        src={product.image_url}
        alt={product.product_name}
        className="card-img-top img-fluid cursor-pointer"
        style={{ height: "12rem", objectFit: "contain" }}
        onClick={handleProductClick}
      />

      {/* Información del producto */}
      <div className="card-body text-center d-flex flex-column justify-content-between">
        {/* Nombre del producto (clicable) */}
        <h5
          className={styles["product-card-title"]}
          onClick={handleProductClick}
        >
          {product.product_name}
        </h5>

        {/* Precio y descuento */}
        <p className="text-muted mb-2">
          <span className="fw-bold text-danger">${product.price}</span>
          {product.discount && (
            <span className="text-decoration-line-through ms-2 text-secondary">
              ${(product.price * (1 + product.discount / 100)).toFixed(2)}
            </span>
          )}
        </p>

        {/* Rating */}
        <div className="mb-2">
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={
                index < Math.floor(product.rating ?? 0)
                  ? "text-warning"
                  : "text-secondary"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
