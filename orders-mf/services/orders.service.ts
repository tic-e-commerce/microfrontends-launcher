import { CreateOrderDto } from "@/interfaces/create-order.interface";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const createOrder = async (createOrderDto: CreateOrderDto, token: string) => {
  return axios.post(`${API_URL}/api/orders/create`, createOrderDto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrder = async (order_id: string, token: string) => {
  return axios.get(`${API_URL}/api/orders/details/${order_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
};

export const cancelOrder = async (order_id: string, token: string) => {
  return axios.post(
    `${API_URL}/api/orders/cancel`,
    { order_id: order_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
