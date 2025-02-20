import React from "react";

interface CancelOrderModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <h4 className="custom-modal-title">Are you sure you want to cancel this order?</h4>
        <p className="custom-modal-text">Your selected items will remain in your cart.</p>
        <div className="custom-modal-buttons">
          <button className="custom-btn custom-btn-danger" onClick={onConfirm}>
            Yes, Cancel Order
          </button>
          <button className="custom-btn custom-btn-secondary" onClick={onClose}>
            No, Keep Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
