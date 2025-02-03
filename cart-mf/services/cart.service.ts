import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Obtener el carrito del usuario
export const getCartByUserId = async (token: string) => {
  return axios.get(`${API_URL}/api/cart/items/`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// Añadir producto al carrito
export const addProductToCart = async (
  cartData: { product_id: number; quantity: number },
  token: string  
) => {
  return axios.post(`${API_URL}/api/cart/add-item`, cartData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Actualizar producto en el carrito
export const updateCart = async (
  product_id: number,
  quantity: number,
  token: string
) => {
  return axios.patch(
    `${API_URL}/api/cart/update-item/${product_id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Eliminar producto del carrito
export const removeProductFromCart = async (
  product_id: number,
  token: string
) => {
  return axios.delete(`${API_URL}/api/cart/remove-item/${product_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Establecer el método de envío
export const setShippingMethod = async (
  payload: { shipping_method: string },
  token: string
) => {
  return axios.post(`${API_URL}/api/cart/set-shipping-method`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
