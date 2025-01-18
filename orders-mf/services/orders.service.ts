import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createOrder = async (orderData: { user_id: string; items: any[] }) => {
  return axios.post(`${API_URL}/orders/create`, orderData);
};

export const getOrder = async (orderId: string) => {
  return axios.get(`${API_URL}/orders/${orderId}`);
};

export const cancelOrder = async (orderId: string) => {
  return axios.post(`${API_URL}/orders/cancel`, { order_id: orderId });
};
