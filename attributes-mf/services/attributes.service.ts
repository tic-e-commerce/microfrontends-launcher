import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/attributes";

export const getAttributesByProductId = async (productId: number) => {
  const response = await axios.get(
    `${API_URL}/api/attributes/values/product/${productId}`,
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
  return response.data; // Retorna el array de atributos
};
