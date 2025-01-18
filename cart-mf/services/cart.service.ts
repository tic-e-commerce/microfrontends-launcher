import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCartByUserId = async (userId: number) => {
  return axios.get(`${API_URL}/cart/${userId}`); 
};

export const addProductToCart = async (cartData: { user_id: number; product_id: number; quantity: number }) => {
  return axios.post(`${API_URL}/cart`, cartData);
};

export const updateCart = async (userId: number, productId: number, quantity: number) => {
  return axios.patch(`${API_URL}/cart/${userId}/${productId}`, { quantity });
};

export const removeProductFromCart = async (userId: number, productId: number) => {
  return axios.delete(`${API_URL}/cart/${userId}/${productId}`);
};
