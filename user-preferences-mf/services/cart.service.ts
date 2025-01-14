import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const AddProductToCart = async (user_id: string, token: string) => {
  return axios.post(
    `${API_URL}/api/user-preferences/favorite-products/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
