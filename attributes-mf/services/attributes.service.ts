import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const getAttributesByProductId = async (productId: number) => {
  const response = await axios.get(
    `${API_URL}/api/attributes?productId=${productId}`
  );
  return response.data;
};