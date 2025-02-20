import styles from "./styles.module.css";

interface ProductImagesProps {
  mainImage: string;
}

const ProductImages = ({ mainImage }: ProductImagesProps) => {
  return (
    <div className={`${styles.productImages}`}>
      <div className={styles.mainImage}>
        <img
          src={mainImage}
          alt="Imagen principal del producto"
          className="img-fluid"
        />
      </div>
    </div>
  );
};

export default ProductImages;
