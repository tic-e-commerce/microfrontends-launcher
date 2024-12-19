import { LoginUserData } from "@/interfaces/login-data.interface";
import { RegisterUserData } from "@/interfaces/register-data.interface";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const LoginUser = async (userData: LoginUserData) => {
  return axios.post(API_URL + "/api/auth/login", {
    ...userData,
  });
};

export const RegisterUser = async (userData: RegisterUserData) => {
  return axios.post(`${API_URL}/api/auth/register`, {
    ...userData,
  });
};

export const SendResetPasswordEmail = async (email: string) => {
  return axios.post(`${API_URL}/api/auth/send-reset-password-email`, { email });
};
