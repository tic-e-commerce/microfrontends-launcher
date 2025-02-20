import React from "react";

interface PaymentCardProps {
  handleRedirectToStripe: () => void;
  isFormValid: boolean;
  loading: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  handleRedirectToStripe,
  isFormValid,
  loading,
}) => {
  return (
    <div className="card border-primary mt-4 shadow-sm w-100">
      <div className="card-body text-center py-3 px-3">
        <p className="text-primary fw-bold fs-6 mb-1">Secure Payment</p>
        <p className="text-muted small mb-2">
          Complete your purchase safely using Stripe.
        </p>
        <button
          className="btn btn-primary w-100 fw-bold py-2 text-white"
          onClick={handleRedirectToStripe}
          disabled={!isFormValid || loading}
        >
          Pay Securely with Stripe
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;

