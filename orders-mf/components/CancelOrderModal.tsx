import React from "react";

interface CancelOrderModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h4 className="modal-title">Are you sure you want to cancel this order?</h4>
        <p className="modal-text">Your selected items will remain in your cart.</p>
        <div className="modal-buttons">
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Cancel Order
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            No, Keep Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
