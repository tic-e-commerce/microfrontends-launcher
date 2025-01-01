import ProductActions from "./product-actions.component";
import ProductImages from "./product-images.component";
import ProductInfo from "./product-info.component";
import styles from "./styles.module.css";

const ProductDetail = () => {
  const product = {
    title: "Havic HV G-92 Gamepad",
    rating: 4.5,
    reviews: 150,
    stock: true,
    price: 192.0,
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.",
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ],
    colors: ["#FF0000", "#000000", "#FFFFFF"],
    sizes: ["XS", "S", "M", "L", "XL"],
  };

  return (
    <div className={`container ${styles.productDetail}`}>
      <div className="row">
        <div className="col-md-6">
          <ProductImages images={product.images} />
        </div>
        <div className="col-md-6">
          <ProductInfo
            title={product.title}
            rating={product.rating}
            reviews={product.reviews}
            stock={product.stock}
            price={product.price}
            description={product.description}
          />
          <ProductActions colors={product.colors} sizes={product.sizes} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
