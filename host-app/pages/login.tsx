import dynamic from "next/dynamic";
import Image from "next/image";
import BannerLogin from "@/public/images/banner_login.png";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const DynamicLoginForm = dynamic(() => import("auth/LoginForm"), {
  ssr: false,
  loading: () => <p>Cargando el formulario...</p>,
});

const DynamicForgotPasswordEmailForm = dynamic(
  () => import("auth/ForgotPasswordEmailForm"),
  {
    ssr: false,
    loading: () => <p>Cargando el formulario...</p>,
  }
);

const Login = () => {
  const [remoteAvailable, setRemoteAvailable] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const checkRemote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_AUTH_URL}`, {
          method: "HEAD",
        });
        console.log(
          "process.env.NEXT_PUBLIC_REMOTE_AUTH_URL",
          process.env.NEXT_PUBLIC_REMOTE_AUTH_URL
        );
        console.log("res", res);
        if (!res.ok) {
          setRemoteAvailable(false);
        }
      } catch (error) {
        setRemoteAvailable(false);
      }
    };

    checkRemote();
  }, []);

  if (!remoteAvailable) {
    return (
      <div>
        <Header />
        <div className="container d-flex flex-column align-items-center justify-content-center">
          <h1>El servicio de autenticación no está disponible</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-0 m-0">
        <div className="row p-0 m-0">
          <div className="col-12 col-md-6 p-0 m-0">
            <Image src={BannerLogin} alt="Banner Login" className="img-fluid" />
          </div>
          <div className="col-12 col-md-6 p-0 m-0">
            <DynamicLoginForm onShowModal={handleShowModal} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className=" modal modal-lg show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-0 p-5">
              <div className="d-flex justify-content-end">
                <FontAwesomeIcon
                  icon={faClose}
                  size="2x"
                  onClick={handleCloseModal}
                />
              </div>
              <DynamicForgotPasswordEmailForm onCloseModal={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Login;
