import PaginatedProductsList from "@/components/paginated-products-list/paginated-products-list.component";
import ProductDetail from "@/components/product-detail/product-detail.component";
import ProductsList from "@/components/products-list/products-list.component";

const Home = () => {

  return (
    <div>
      <ProductDetail />
      <ProductsList title="Product List"/>
      <PaginatedProductsList title="Paginated Product List"/>
    </div>
  );
};

export default Home;
