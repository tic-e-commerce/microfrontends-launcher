import ChangePasswordData from "@/interfaces/change-password-data.interface";
import UserUpdateData from "@/interfaces/user-update-data.interface";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ProfileUser = async (user_id: string, token: string) => {
  return axios.get(`${API_URL}/api/profile/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
};

export const UpdateProfile = async (token: string, data: UserUpdateData) => {
  return axios.patch(`${API_URL}/api/profile/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ChangePassword = async (
  token: string,
  data: ChangePasswordData
) => {
  return axios.patch(`${API_URL}/api/profile/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
