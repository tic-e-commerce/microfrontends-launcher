import ProductDetail from "@/components/product-detail/product-detail.component";
import ProductsList from "@/components/products-list/products-list.component";

const Home = () => {
  const sampleProducts = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: 120,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 40,
      rating: 4.5,
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: 960,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 35,
      rating: 4.0,
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: 370,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 30,
      rating: 4.8,
    },
    {
      id: 4,
      name: "S-Series Comfort Chair",
      price: 375,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 25,
      rating: 4.5,
    },
    {
      id: 5,
      name: "Red Electric Car",
      price: 960,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 15,
      rating: 4.9,
    },
    {
      id: 6,
      name: "Nike Zoom Soccer Cleats",
      price: 1160,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 25,
      rating: 4.7,
    },
  ];

  return (
    <div>
      <ProductDetail />
      <ProductsList title="Product List" products={sampleProducts} />
    </div>
  );
};

export default Home;
