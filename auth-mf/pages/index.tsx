import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import BannerLogin from "@/public/images/banner_login.png";

const Home = () => {
  const handleOnShowModal = () => {
    console.log("Show Modal");
  };
  return (
    <div className="vh-100 p-0 m-0">
      <div className="row p-0 m-0">
        <div className="col-12 col-md-6 p-0 m-0">
          <Image src={BannerLogin} alt="Banner Login" className="img-fluid" />
        </div>
        <div className="col-12 col-md-6 p-0 m-0">
          <LoginForm onShowModal={handleOnShowModal} />
        </div>
      </div>
    </div>
  );
};

export default Home;
