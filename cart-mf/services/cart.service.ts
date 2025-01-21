import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCartByUserId = async (user_id: string, token: string) => {
  return axios.get(`${API_URL}/api/cart/items/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
};

export const addProductToCart = async (
  cartData: { user_id: number; product_id: number; quantity: number },
  token: string
) => {
  return axios.post(`${API_URL}/api/cart/add-item`, cartData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCart = async (
  user_id: number,
  product_id: number,
  quantity: number,
  token: string
) => {
  return axios.patch(
    `${API_URL}/api/cart/update-item/${user_id}/${product_id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeProductFromCart = async (
  user_id: number,
  product_id: number,
  token: string
) => {
  return axios.delete(
    `${API_URL}/api/cart/remove-item/${user_id}/${product_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const setShippingMethod = async (
  payload: { user_id: number; shipping_method: string },
  token: string
) => {
  return axios.post(`${API_URL}/api/cart/set-shipping-method`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
