interface ProductImagesProps {
  images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  return (
    <div className="product-images">
      <div className="main-image mb-4">
        <img src={images[0]} alt="Main product" className="img-fluid" />
      </div>
      <div className="thumbnail-images d-flex gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="img-thumbnail"
            style={{ width: "80px", cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
