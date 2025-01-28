interface ProductInfoProps {
  title: string;
  rating: number;
  stock: boolean;
  price: number;
  description: string;
}

const ProductInfo = ({
  title,
  rating,
  stock,
  price,
  description,
}: ProductInfoProps) => {
  return (
    <div className="product-info">
      <h2 className="fw-bold">{title}</h2>
      <div className="rating mb-3">
        <span className="text-warning">{`⭐`.repeat(Math.floor(rating))}</span>
      </div>
      <p className={`stock-status ${stock ? "text-success" : "text-danger"}`}>
        {stock ? "En stock" : "Agotado"}
      </p>
      <h3 className="fw-bold text-danger">${price.toFixed(2)}</h3>
      <p className="mt-3">{description}</p>
    </div>
  );
};

export default ProductInfo;
