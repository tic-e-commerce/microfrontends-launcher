import Orders from "../components/Orders";


const Home = () => {
  const userId = "1"; 

  return (
    <div>
      <Orders userId={userId} />
    </div>
  );
};

export default Home;
