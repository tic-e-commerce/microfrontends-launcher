import { Review } from "@/models/Review";
// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

// export const getReviewsByProductId = async (productId: number) => {
//   const response = await axios.get(`${API_URL}/api/reviews?productId=${productId}`);
//   return response.data;
// };

// export const createReview = async (reviewData: unknown) => {
//   const response = await axios.post(`${API_URL}/api/reviews`, reviewData);
//   return response.data;
// };

export const getReviewsByProductId = async (productId: number) => {
  // Mock de datos para una lista de reseñas
  return [
    {
      review_id: 1,
      product_id: productId,
      user_id: 101,
      rating: 5,
      comment: "Excellent product! Highly recommend it.",
      review_date: "2023-12-15",
    },
    {
      review_id: 2,
      product_id: productId,
      user_id: 102,
      rating: 4,
      comment: "Very good quality, but delivery took too long.",
      review_date: "2023-12-10",
    },
    {
      review_id: 3,
      product_id: productId,
      user_id: 103,
      rating: 3,
      comment: "Average product, expected more for the price.",
      review_date: "2023-12-08",
    },
  ];
};

export const createReview = async (reviewData: Review) => {
  // Mock de respuesta para crear una reseña
  return {
    message: "Review created successfully",
    review: {
      ...reviewData,
      review_date: new Date().toISOString(),
    },
  };
};
