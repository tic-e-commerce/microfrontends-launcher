import FavoritesProducts from "@/components/FavoritesProducts";
import dynamic from "next/dynamic";
const DynamicHeader = dynamic(() => import("host/Header"), {
  ssr: false,
});
const Home = () => {
  return (
    <div>
      <DynamicHeader />
      <FavoritesProducts />
    </div>
  );
};

export default Home;
