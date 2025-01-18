import React, { useState } from "react";
import { createPaymentSession, handleSuccess, handleCancel } from "@/services/payments.service";

const Payments: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initiatePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      const paymentData = {
        amount: 1000, // Monto del pago en centavos
        currency: "USD", 
      };

      const response = await createPaymentSession(paymentData);
      window.location.href = response.data.url; // Redirigir al URL de pago
    } catch (error) {
      setMessage("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await handleSuccess();
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to process success status.");
    }
  };

  const handlePaymentCancel = async () => {
    try {
      const response = await handleCancel();
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to process cancel status.");
    }
  };

  return (
    <div className="payment-container">
      <h1>Payments</h1>
      <button onClick={initiatePayment} disabled={loading} className="btn btn-primary">
        {loading ? "Loading..." : "Pay Now"}
      </button>

      {message && <p>{message}</p>}

      <div className="mt-4">
        <button onClick={handlePaymentSuccess} className="btn btn-success">
          Simulate Success
        </button>
        <button onClick={handlePaymentCancel} className="btn btn-danger">
          Simulate Cancel
        </button>
      </div>
    </div>
  );
};

export default Payments;
