import AddFavoriteProductData from "@/interfaces/add-favorite-product-data.interface";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const GetFavoriteProducts = async (user_id: string, token: string) => {
  return axios.get(
    `${API_URL}/api/user-preferences/favorite-products/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const AddFavoriteProduct = async (
  token: String,
  data: AddFavoriteProductData
) => {
  return axios.post(
    `${API_URL}/api/user-preferences/add-favorite-product`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const DeleteFavoriteProduct = async (
  token: String,
  favorite_product_id: number
) => {
  return axios.delete(
    `${API_URL}/api/user-preferences/delete-favorite-product/${favorite_product_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
