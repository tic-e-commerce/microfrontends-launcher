import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ResetPassword } from "@/services/auth.service";
import { ResetPasswordData } from "@/interfaces/reset-password-data.interface";

const ForgotPasswordForm = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token as string);
    }
  }, [router.query.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Invalid token.");
      setLoading(false);
      return;
    }

    const resetPasswordData: ResetPasswordData = {
      new_password: newPassword,
      token: token,
    };

    try {
      await ResetPassword(resetPasswordData);
      setSuccess("Your password has been successfully reset.");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while resetting your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="mb-4 fs-3 fw-bold">Reset Password</h1>
      <p>Please enter your new password below.</p>
      {/* Error and Success Messages */}
      {error && <p className="alert alert-danger mt-3">{error}</p>}
      {success && <p className="alert alert-success mt-3">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center w-100">
        {/* New Password Field */}
        <input
          type="password"
          className="border-0 border-bottom border-2 p-2 input-border-bottom w-50 mb-4"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        {/* Confirm Password Field */}
        <input
          type="password"
          className="border-0 border-bottom border-2 p-2 input-border-bottom w-50 mb-4"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary text-white py-3 px-5"
          disabled={loading}>
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
