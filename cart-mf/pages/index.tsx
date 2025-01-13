import Cart from "@/components/Cart";

const userId = 1;
const Home = () => {
  return (
    <div>
      <Cart userId={userId} />
    </div>
  );
};

export default Home;
