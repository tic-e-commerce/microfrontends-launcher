import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPaymentSuccess } from "@/services/payments.service";

const PaymentSuccess: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSuccessStatus = async () => {
      try {
        const response = await getPaymentSuccess();
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching payment success status:", error);
        setMessage("Your order has been confirmed. A receipt has been sent to your email.");
      }
    };

    fetchSuccessStatus();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h2 className="text-success" style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "15px" }}>
        Order Confirmed
      </h2>
      <p className="text-muted" style={{ fontSize: "1.1rem", marginBottom: "25px" }}>
        {message || "Thank you for your purchase! Your order is now being processed."}
      </p>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn"
          style={{
            backgroundColor: "#dc3545",  
            color: "#fff",
            borderRadius: "6px",
            padding: "12px 20px",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "all 0.3s ease",
            border: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
          onClick={() => router.push("/orders")}
        >
          View Order Details
        </button>
        <button
          className="btn"
          style={{
            backgroundColor: "#6c757d",
            color: "#fff",
            borderRadius: "6px",
            padding: "12px 20px",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "all 0.3s ease",
            border: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5a6268")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
          onClick={() => router.push("/shop")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
