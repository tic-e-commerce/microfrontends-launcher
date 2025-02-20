import { Product } from "@/models";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/products";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/api/products/id/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data;
};

export const getReviewsByProductId = async (id: number) => {
  const response = await axios.get(`${API_URL}/api/review/product/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data;
};

export const getAverageRatingByProductId = async (id: number) => {
  try {
    const reviews = await getReviewsByProductId(id);
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return 0; // Si no hay reseñas, el promedio es 0
    }

    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRatings / reviews.length; // Calcula el promedio
  } catch (error) {
    console.error("Error al obtener el promedio de ratings:", error);
    return 0;
  }
};

export const createProduct = async (productData: Product) => {
  const response = await axios.post(`${API_URL}`, productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: Product) => {
  const response = await axios.patch(`${API_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};


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

// Obtener todos los atributos disponibles para filtrar
export const getAllAttributes = async () => {
  const response = await axios.get(`${API_URL}/api/attributes`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data; // Retorna la lista de atributos
};