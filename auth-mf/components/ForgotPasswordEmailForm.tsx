import { useState } from "react";
import { SendResetPasswordEmail } from "@/services/auth.service";

interface ForgotPasswordEmailFormProps {
  onCloseModal: () => void;
}

const ForgotPasswordEmailForm: React.FC<ForgotPasswordEmailFormProps> = ({
  onCloseModal,
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await SendResetPasswordEmail(email);
      setSuccess("A reset password link has been sent to your email.");
      setEmail("");
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while sending the reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" d-flex flex-column align-items-center justify-content-center p-5">
      <h1 className=" fs-3 fw-bold ">FORGOT PASSWORD</h1>
      <p className="mt-3">
        Please enter your email address to reset your password.
      </p>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center w-100">
        <input
          type="email"
          className="border-0 border-bottom border-2 p-2 input-border-bottom w-75 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-primary text-white py-3 px-5"
          disabled={loading}>
          {loading ? "Loading..." : "Send reset link"}
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
        {success && <p className="text-success mt-3">{success}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordEmailForm;
