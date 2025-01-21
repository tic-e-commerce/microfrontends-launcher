import { Product } from "@/models";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/products";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data;
};

export const createProduct = async (productData: Product) => {
  const response = await axios.post(`${API_URL}`, productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: Product) => {
  const response = await axios.patch(`${API_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
