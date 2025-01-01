interface ProductInfoProps {
  title: string;
  rating: number;
  reviews: number;
  stock: boolean;
  price: number;
  description: string;
}

const ProductInfo = ({
  title,
  rating,
  reviews,
  stock,
  price,
  description,
}: ProductInfoProps) => {
  return (
    <div className="product-info">
      <h2 className="fw-bold">{title}</h2>
      <div className="rating mb-3">
        <span className="text-warning">{`⭐`.repeat(Math.floor(rating))}</span>
        <span className="text-muted ms-2">{`(${reviews} Reviews)`}</span>
      </div>
      <p className={`stock-status ${stock ? "text-success" : "text-danger"}`}>
        {stock ? "In Stock" : "Out of Stock"}
      </p>
      <h3 className="fw-bold text-danger">${price.toFixed(2)}</h3>
      <p className="mt-3">{description}</p>
    </div>
  );
};

export default ProductInfo;
