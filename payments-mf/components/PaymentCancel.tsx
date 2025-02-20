import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPaymentCancel } from "@/services/payments.service";

const PaymentCancel: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCancelStatus = async () => {
      try {
        const response = await getPaymentCancel();
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching payment cancel status:", error);
        setMessage("Your order was not processed. If this was an error, please try again.");
      }
    };

    fetchCancelStatus();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h2 className="text-danger" style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "15px" }}>
        Order Not Completed
      </h2>
      <p className="text-muted" style={{ fontSize: "1.1rem", marginBottom: "25px" }}>
        {message || "Your payment was cancelled or could not be processed."}
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
          onClick={() => router.push("/checkout")}
        >
          Try Again
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
          Back to Shop
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
