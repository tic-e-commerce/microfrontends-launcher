import { FavoriteProduct } from "@/models/favorite-product.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCartPlus } from "@fortawesome/free-solid-svg-icons";

interface FavoriteProductCardProps {
  product: FavoriteProduct;
  onRemove: (productId: number) => void; // Función para eliminar el producto
  onAddToCart: (productId: number) => void; // Función para agregar al carrito
}

const FavoriteProductCard = ({
  product,
  onRemove,
  onAddToCart,
}: FavoriteProductCardProps) => {
  // Función para eliminar el producto de favoritos
  const handleRemove = async () => {
    onRemove(product.favoriteProductId); // Llama la función pasada por props
  };

  // Función para agregar el producto al carrito
  const handleAddToCart = async () => {
    onAddToCart(product.favoriteProductId); // Llama la función pasada por props
  };

  return (
    <div className="position-relative m-2" style={{ width: "270px" }}>
      {/* Botón de eliminar */}
      <button
        className="btn btn-light btn-sm position-absolute rounded-circle"
        style={{ top: "10px", right: "10px" }}
        title="Remove from favorites"
        onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>

      {/* Imagen */}
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="card-img-top rounded-top"
        style={{ objectFit: "cover", height: "200px" }}
      />

      {/* Botón Add to Cart */}
      <button
        className="btn btn-dark w-100 mt-0 mb-3 rounded-0 rounded-bottom py-3"
        onClick={handleAddToCart}>
        <FontAwesomeIcon icon={faCartPlus} /> Add To Cart
      </button>
      {/* Cuerpo de la tarjeta */}
      <div>
        {/* Nombre del producto */}
        <span className="fs-6 fw-bold">{product.productName}</span>

        {/* Precio */}
        <p className="text-primary">${product.price}</p>
      </div>
    </div>
  );
};

export default FavoriteProductCard;
