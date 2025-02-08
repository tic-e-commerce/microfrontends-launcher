import React, { useEffect, useState } from "react";
import { createPaymentSession } from "@/services/payments.service";
import { useRouter } from "next/router";

const Payments: React.FC = () => {
  const [order_id, setOrderId] = useState<string | null>(null);
  const [user_id, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    address: false,
    city: false,
    phoneNumber: false,
  });
  const [isTouched, setIsTouched] = useState({
    firstName: false,
    address: false,
    city: false,
    phoneNumber: false,
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user_id");

    if (!token) {
      setError("Authorization token not found.");
      router.push("/login");
      return;
    }

    if (!storedUserId) {
      setError("User ID not found.");
      router.push("/login");
      return;
    }

    setUserId(storedUserId);

    const interval = setInterval(() => {
      const storedOrderId = localStorage.getItem("order_id");
      if (storedOrderId && storedOrderId !== order_id) {
        console.log("Updating order_id:", storedOrderId);
        setOrderId(storedOrderId);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [router, order_id]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (isTouched[id as keyof typeof isTouched]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === "",
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setIsTouched((prevTouched) => ({ ...prevTouched, [id]: true }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value.trim() === "",
    }));
  };

  const validateForm = () => {
    const errors = {
      firstName: formData.firstName.trim() === "",
      address: formData.address.trim() === "",
      city: formData.city.trim() === "",
      phoneNumber: formData.phoneNumber.trim() === "",
    };
    setFormErrors(errors);
    setIsFormValid(!Object.values(errors).includes(true));
  };

  // 🔹 Asegurar que `order_id` es válido antes de procesar el pago
  const handleRedirectToStripe = async () => {
    if (!isFormValid) {
      setError("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token not found.");
      return;
    }

    const currentOrderId = localStorage.getItem("order_id");

    if (!currentOrderId) {
      setError("No active order found.");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const billingDetails = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        city: formData.city,
        phone_number: formData.phoneNumber,
      };

      const paymentData = {
        user_id: user_id as string,
        order_id: currentOrderId,
        currency: "usd",
        billing_details: billingDetails,
      };

      console.log("Sending payment request:", paymentData);
      const response = await createPaymentSession(paymentData, token);

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        setError("Failed to retrieve payment URL.");
      }
    } catch (err: any) {
      setError("Failed to create payment session.");
      console.error("Payment Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Billing Details</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Processing payment...</div>}

      {!order_id ? (
        <div className="alert alert-warning">
          Order is being prepared. Please wait...
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form>
              {["firstName", "lastName", "address", "city", "phoneNumber"].map(
                (field) => (
                  <div key={field} className="mb-3">
                    <label htmlFor={field} className="form-label">
                      {field.replace(/([A-Z])/g, " $1").trim()}*
                    </label>
                    <input
                      type={field === "phoneNumber" ? "tel" : "text"}
                      className={`form-control ${
                        isTouched[field as keyof typeof isTouched] &&
                        formErrors[field as keyof typeof formErrors]
                          ? "is-invalid"
                          : ""
                      }`}
                      id={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {isTouched[field as keyof typeof isTouched] &&
                      formErrors[field as keyof typeof formErrors] && (
                        <div className="invalid-feedback">
                          {`${field
                            .replace(/([A-Z])/g, " $1")
                            .trim()} is required.`}
                        </div>
                      )}
                  </div>
                )
              )}
            </form>
            <hr />
            <div className="card border-danger">
              <div className="card-body">
                <h5 className="card-title text-danger">Payment with Stripe</h5>
                <p className="card-text">
                  You will be redirected to Stripe website to complete your
                  purchase securely.
                </p>
              </div>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-primary w-100"
                onClick={handleRedirectToStripe}
                disabled={!isFormValid || loading}
              >
                Proceed to Stripe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;