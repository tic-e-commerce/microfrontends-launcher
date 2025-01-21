import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createPaymentSession = async (
  paymentData: { order_id: string; currency: string },
  token: string
) => {
  return axios.post(
    `${API_URL}/api/payments/create-payment-session`,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const handleSuccess = async () => {
  return axios.get(`${API_URL}/api/payments/success`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

export const handleCancel = async () => {
  return axios.get(`${API_URL}/api/payments/cancel`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};
