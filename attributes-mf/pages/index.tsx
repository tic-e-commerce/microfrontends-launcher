import AttributesList from "@/components/attributes-list.component";

const Home = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Product Attributes</h1>
      <AttributesList productId={1} />
    </div>
  );
};

export default Home;
