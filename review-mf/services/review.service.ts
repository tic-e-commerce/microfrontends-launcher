import axios from "axios";
import { Review } from "@/models/Review";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/review";

// Obtener todas las reseñas
export const getReviews = async (): Promise<Review[]> => {
  const response = await axios.get(`${API_URL}/api/review`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  // Verificar si la respuesta contiene un arreglo
  if (Array.isArray(response.data)) {
    return response.data;
  }

  console.error("Respuesta inesperada de la API:", response.data);
  return [];
};

// Obtener reseñas por `product_id`
export const getReviewsByProductId = async (
  productId: number
): Promise<Review[]> => {
  const allReviews = await getReviews();

  if (Array.isArray(allReviews)) {
    return allReviews.filter((review) => review.product_id === productId);
  }

  console.error("El resultado de getReviews no es un arreglo:", allReviews);
  return [];
};

// Crear una nueva reseña
export const createReview = async (reviewData: Partial<Review>) => {
  const response = await axios.post(`${API_URL}/api/review`, reviewData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// Actualizar una reseña existente
export const updateReview = async (
  reviewId: number,
  updatedData: Partial<Review>
) => {
  const response = await axios.patch(`${API_URL}/api/review/${reviewId}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// Eliminar una reseña
export const deleteReview = async (reviewId: number) => {
  const response = await axios.delete(`${API_URL}/api/review/${reviewId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
