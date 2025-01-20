import React, { useEffect, useState } from "react";
import { createPaymentSession } from "@/services/payments.service";
import { useRouter } from "next/router";

const Payments: React.FC = () => {
  const [order_id, setOrderId] = useState<string | null>(null);
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
    const storedOrderId = localStorage.getItem("order_id");
    const token = localStorage.getItem("token");

    if (!storedOrderId || !token) {
      setError("Order ID or authorization token not found.");
      router.push("/login");
      return;
    }

    setOrderId(storedOrderId);
  }, [router]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (isTouched[id as keyof typeof isTouched]) {
      if (value.trim() === "") {
        setFormErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setIsTouched((prevTouched) => ({ ...prevTouched, [id]: true }));
    if (value.trim() === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
    }
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

  const handleRedirectToStripe = async () => {
    if (!isFormValid) {
      setError("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    const orderId = localStorage.getItem("order_id");
    if (!token) {
      setError("Authorization token not found.");
      return;
    }

    if (!orderId) {
      setError("Order ID not found.");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const paymentData = {
        order_id: orderId,
        currency: "usd",
      };

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
      <h2 className="text-center mb-4 text-primary">Billing Details</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Processing payment...</div>}

      <div className="row">
        <div className="col-md-6 mx-auto">
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name*
              </label>
              <input
                type="text"
                className={`form-control ${
                  isTouched.firstName && formErrors.firstName ? "is-invalid" : ""
                }`}
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isTouched.firstName && formErrors.firstName && (
                <div className="invalid-feedback">First name is required.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address*
              </label>
              <input
                type="text"
                className={`form-control ${
                  isTouched.address && formErrors.address ? "is-invalid" : ""
                }`}
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isTouched.address && formErrors.address && (
                <div className="invalid-feedback">Address is required.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Town/City*
              </label>
              <input
                type="text"
                className={`form-control ${
                  isTouched.city && formErrors.city ? "is-invalid" : ""
                }`}
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isTouched.city && formErrors.city && (
                <div className="invalid-feedback">City is required.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number*
              </label>
              <input
                type="tel"
                className={`form-control ${
                  isTouched.phoneNumber && formErrors.phoneNumber
                    ? "is-invalid"
                    : ""
                }`}
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isTouched.phoneNumber && formErrors.phoneNumber && (
                <div className="invalid-feedback">
                  Phone number is required.
                </div>
              )}
            </div>
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
    </div>
  );
};

export default Payments;
