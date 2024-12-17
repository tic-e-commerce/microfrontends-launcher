import { faClock, faStar, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Interfaz para tipar los productos
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discount?: number;
  rating: number;
}

const ProductsComponent = () => {
  // Datos simulados para los productos
  const products: Product[] = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: 120,
      imageUrl: "/images/gamepad.jpg",
      discount: 25,
      rating: 4.8,
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: 45,
      imageUrl: "/images/keyboard.jpg",
      discount: 15,
      rating: 4.5,
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: 320,
      imageUrl: "/images/monitor.jpg",
      discount: 20,
      rating: 4.7,
    },
    {
      id: 4,
      name: "E-Sense Comfort Chair",
      price: 90,
      imageUrl: "/images/chair.jpg",
      discount: 10,
      rating: 4.3,
    },
  ];

  return (
    <div className="container py-5">
      {/* Encabezado de sección */}
      <div className="text-center mb-4">
        <h1 className="text-primary fw-bold">Flash Sales</h1>
        <p>
          <FontAwesomeIcon icon={faClock} className="me-2 text-danger" />
          ¡Tiempo limitado para obtener tus productos favoritos!
        </p>
      </div>

      {/* Sección de productos */}
      <div className="row gy-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 col-sm-6">
            <div className="card shadow-sm h-100">
              {/* Imagen del producto */}
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              {/* Contenido de la tarjeta */}
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  <span className="text-muted text-decoration-line-through me-2">
                    ${Math.round(product.price * 1.2)}
                  </span>
                  <span className="fw-bold text-success">${product.price}</span>
                  {product.discount && (
                    <span className="badge bg-danger ms-2">
                      <FontAwesomeIcon icon={faTag} /> -{product.discount}%
                    </span>
                  )}
                </p>
                {/* Rating */}
                <div className="text-warning mb-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className={
                        index < Math.floor(product.rating)
                          ? "text-warning"
                          : "text-secondary"
                      }
                    />
                  ))}
                  <span className="ms-1 text-muted">{product.rating}</span>
                </div>
                {/* Botón */}
                <button className="btn btn-primary w-100 mt-2">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsComponent;
