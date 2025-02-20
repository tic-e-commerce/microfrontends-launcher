import PaginatedProductsList from "@/components/paginated-products-list/paginated-products-list.component";
import ProductsList from "@/components/products-list/products-list.component";

const Home = () => {

  return (
    <div>
      <ProductsList title="Product List"/>
      <PaginatedProductsList title="Paginated Product List"/>
    </div>
  );
};

export default Home;
