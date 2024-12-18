import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const LoginUser = async (email: String, password: String) => {
  return axios.post(API_URL + "/api/auth/login", {
    email,
    password,
  });
};
