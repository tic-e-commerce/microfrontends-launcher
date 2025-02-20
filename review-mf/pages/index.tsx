import ReviewsList from "@/components/review-list/review-list.component";

const Home = () => {
  return (
    <div>
      <h1>Product Details</h1>
      {/* Otras secciones del producto */}
      <ReviewsList productId={12} />
    </div>
  );
};

export default Home;
