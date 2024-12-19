import Image from "next/image";
import BannerLogin from "@/public/images/banner_login.png";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  return (
    <div className="vh-100 p-0 m-0">
      <div className="row p-0 m-0">
        <div className="col-12 col-md-6 p-0 m-0">
          <Image src={BannerLogin} alt="Banner Login" className="img-fluid" />
        </div>
        <div className="col-12 col-md-6 p-0 m-0">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
