import { useState } from "react";
import { RegisterUser } from "@/services/auth.service";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await RegisterUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        address: formData.address?.length ? formData.address : undefined,
        phone: formData.phone?.length ? formData.phone : undefined,
      });
      setSuccess("Registration successful. You can now log in.");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        address: "",
        phone: "",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      if (Array.isArray(err.response?.data?.message)) {
        const messages = err.response?.data?.message.join(", ");
        setError(messages);
      } else {
        setError(
          err.response?.data?.message ||
            "An error occurred during registration. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="w-75">
          <h1>Register on Exclusive</h1>
          <p>
            <small>Fill in your details below to create an account.</small>
          </p>
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* Success Message */}
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )}
            <div className="row">
              <div className="col-12 col-md-6">
                {/* First Name */}
                <div className="mt-4">
                  <input
                    type="text"
                    className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                    id="first_name"
                    name="first_name"
                    placeholder="First Name*"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                {/* Last Name */}
                <div className="mt-4">
                  <input
                    type="text"
                    className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name*"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="my-4">
              <input
                type="email"
                className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                id="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="my-4">
              <input
                type="password"
                className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                id="password"
                name="password"
                placeholder="Password*"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="my-4">
              <input
                type="password"
                className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm Password*"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address (Optional) */}
            <div className="my-4">
              <input
                type="text"
                className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                id="address"
                name="address"
                placeholder="Address (Optional)"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Phone (Optional) */}
            <div className="my-4">
              <input
                type="text"
                className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                id="phone"
                name="phone"
                placeholder="Phone (Optional)"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="row my-5 align-items-center justify-content-center">
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary w-100 text-white py-3"
                  disabled={loading}>
                  {loading ? "Loading..." : "Create Account"}
                </button>
              </div>
              <div className="col-12 mt-4 text-center">
                <small>
                  Already have an account?{" "}
                  <a href="/login" className="text-primary">
                    Log in
                  </a>
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
