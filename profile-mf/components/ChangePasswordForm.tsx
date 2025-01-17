import React, { useState, useEffect } from "react";
import { ChangePassword } from "@/services/profile.service";
import ChangePasswordData from "@/interfaces/change-password-data.interface";
import { useRouter } from "next/router";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState<Omit<ChangePasswordData, "user_id">>(
    {
      old_password: "",
      new_password: "",
    }
  );

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem("user_id");
      if (!storedUserId) {
        setError("User ID not found.");
      } else {
        setUserId(storedUserId);
      }
    } catch {
      setError("Failed to access the user ID.");
    }
  }, []); // Runs only once after the component mounts

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.new_password !== confirmPassword) {
      setError("The new password and confirmation do not match.");
      setSuccess(null);
      return;
    }

    if (!userId) {
      setError("User ID not found.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found.");
      return;
    }

    const isUnauthorized = () => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      router.push("/login");
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await ChangePassword(token, {
        user_id: Number(userId),
        ...formData,
      });

      if (response.status === 200) {
        setSuccess("Password successfully changed!");
        setFormData({
          old_password: "",
          new_password: "",
        });
        setConfirmPassword("");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError("There was an issue changing the password.");
      }
    } catch (err: any) {
      if (err.status === 401) {
        isUnauthorized();
        return;
      }
      setError(
        err?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="fs-3 text-primary mb-4">Change Password</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="mb-3">
          {/* <label htmlFor="old_password" className="form-label">
            Current Password
          </label> */}
          <input
            type="password"
            id="old_password"
            name="old_password"
            value={formData.old_password}
            onChange={handleChange}
            className="form-control"
            placeholder="Current password"
            required
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="new_password" className="form-label">
            New Password
          </label> */}
          <input
            type="password"
            id="new_password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            className="form-control"
            placeholder="New password"
            required
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password
          </label> */}
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Confirm new password"
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary text-white py-2 px-4"
            disabled={loading}>
            {loading ? "Changing..." : "Change password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
