import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createPaymentSession = async (
  paymentData: {
    user_id: string;
    order_id: string;
    currency: string;
    billing_details: {
      first_name: string;
      last_name: string;
      address: string;
      city: string;
      phone_number: string; 
    };
  },
  token: string
) => {
  return axios.post(`${API_URL}/api/payments/create-payment-session`, paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPaymentSuccess = async () => {
  return axios.get(`${API_URL}/api/payments/success`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

export const getPaymentCancel = async () => {
  return axios.get(`${API_URL}/api/payments/cancel`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};
