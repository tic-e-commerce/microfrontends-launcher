interface ProductActionsProps {
  colors: string[];
  sizes: string[];
}

const ProductActions = ({ colors, sizes }: ProductActionsProps) => {
  return (
    <div className="product-actions">
      <div className="mb-3">
        <h5>Colours:</h5>
        <div className="d-flex gap-2">
          {colors.map((color, index) => (
            <span
              key={index}
              className="color-option"
              style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
            ></span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <h5>Size:</h5>
        <div className="d-flex gap-2">
          {sizes.map((size, index) => (
            <button key={index} className="btn btn-outline-secondary">
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 d-flex align-items-center gap-3">
        <input
          type="number"
          className="form-control w-25"
          defaultValue={1}
          min={1}
        />
        <button className="btn btn-danger">Buy Now</button>
        <button className="btn btn-outline-secondary">Add to Cart</button>
      </div>

      <div className="mt-4">
        <p>✅ Free Delivery</p>
        <p>🔄 Return Delivery</p>
      </div>
    </div>
  );
};

export default ProductActions;
