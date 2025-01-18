import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createPaymentSession = async (paymentData: { amount: number; currency: string }) => {
  return axios.post(`${API_URL}/payments/create-payment-session`, paymentData);
};

export const handleSuccess = async () => {
  return axios.get(`${API_URL}/payments/success`);
};

export const handleCancel = async () => {
  return axios.get(`${API_URL}/payments/cancel`);
};
