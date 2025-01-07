import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProfileUser, UpdateProfile } from "@/services/profile.service";
import { User } from "@/model/user.model";

const UpdateProfileForm = () => {
  const [profile, setProfile] = useState<User>({
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    registration_date: new Date(),
    status: "",
    created_at: new Date(),
    updated_at: new Date(),
  });

  const [originalProfile, setOriginalProfile] = useState<User>({
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    registration_date: new Date(),
    status: "",
    created_at: new Date(),
    updated_at: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!user_id || !token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await ProfileUser(user_id, token);
        const fetchedProfile = {
          user_id: response.data.user_id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          address: response.data.address,
          phone: response.data.phone,
          registration_date: new Date(response.data.registration_date),
          status: response.data.status,
          created_at: new Date(response.data.created_at),
          updated_at: new Date(response.data.updated_at),
        };
        setProfile(fetchedProfile);
        setOriginalProfile(fetchedProfile);
        setLoading(false);
      } catch (err: any) {
        if (err.status === 401) {
          isUnauthorized();
          return;
        }
        setError(err.message || "Error fetching profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const isUnauthorized = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await UpdateProfile(token, {
        user_id: profile.user_id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone ?? "",
        address: profile.address ?? "",
      });

      if (response.status === 200) {
        setSuccess(true);
        setOriginalProfile(profile);
      } else {
        setError("Error updating profile");
      }
    } catch (err: any) {
      if (err.status === 401) {
        isUnauthorized();
        return;
      }
      setError(err.message || "Error updating profile");
    } finally {
      setLoading(false);
      setIsEditable(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditable) {
      setProfile(originalProfile); // Revert changes on cancel
    }
    setIsEditable(!isEditable);
    setSuccess(false);
    setError(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-primary fs-3">Edit Your Profile</h1>
      {success && (
        <div className="alert alert-success">Profile updated successfully!</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              className="form-control"
              disabled={!isEditable}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              className="form-control"
              disabled={!isEditable}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="form-control"
              disabled={!isEditable}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="form-control"
              disabled={!isEditable}
              required
            />
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <button
            type="button"
            className={`btn py-2 px-4  ${
              isEditable ? "btn-outline-dark border-0" : "btn-outline-primary"
            }`}
            onClick={handleEditToggle}>
            {isEditable ? "Cancel" : "Edit"}
          </button>
          {isEditable && (
            <button
              type="submit"
              className="ms-2 btn btn-primary text-white py-2 px-4">
              Save changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
