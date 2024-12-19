import { useState } from "react";
import ForgotPasswordEmailForm from "@/components/ForgotPasswordEmailForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordEmail = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <h1>Forgot Password Page</h1>

      {/* Button to Show Modal */}
      <button className="btn btn-primary mt-4" onClick={handleShowModal}>
        Reset Password
      </button>

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
              <ForgotPasswordEmailForm onCloseModal={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordEmail;
