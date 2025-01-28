import React, { useEffect, useState } from "react";
import {
  getReviewsByProductId,
  createReview,
  updateReview,
  deleteReview,
} from "@/services/review.service";
import ReviewItem from "../review-item/review-item.component";
import { Review } from "@/models/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave, faTimes, faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewsList = ({ productId }: { productId: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está logueado
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!userId && !!token);

    // Obtener las reseñas del producto
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByProductId(productId);
        if (!Array.isArray(data)) {
          console.error("Reseñas no válidas:", data);
          setReviews([]);
          return;
        }
        setReviews(data);
      } catch (error) {
        console.error("Error al obtener las reseñas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleCreateReview = async () => {
    if (!newReview.rating || !newReview.comment) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const createdReview = await createReview({
        product_id: productId,
        rating: newReview.rating,
        comment: newReview.comment,
        review_date: new Date().toISOString(),
      });
      setReviews([...reviews, createdReview]);
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Error al crear la reseña:", error);
    }
  };

  const handleRatingSelect = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;

    try {
      const updatedReview = await updateReview(editingReview.review_id, {
        rating: editingReview.rating,
        comment: editingReview.comment,
      });
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.review_id === editingReview.review_id ? updatedReview : review
        )
      );
      setEditingReview(null);
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta reseña?")) return;

    try {
      await deleteReview(reviewId);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.review_id !== reviewId)
      );
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
    }
  };

  if (loading) {
    return <p>Cargando reseñas...</p>;
  }

  return (
    <div className="reviews-list container mt-4">
      <h5 className="fw-bold mb-3">Reseñas de Clientes</h5>

      {/* Mostrar formulario de crear solo si el usuario está autenticado */}
      {isLoggedIn && (
        <div className="card p-4 mb-4 shadow-sm">
          <h6 className="fw-bold mb-3">Agregar una nueva reseña</h6>
          <div className="mb-3">
            <p className="mb-1">Selecciona una calificación:</p>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={`cursor-pointer ${
                    star <= newReview.rating ? "text-warning" : "text-muted"
                  }`}
                  onClick={() => handleRatingSelect(star)}
                  style={{ fontSize: "24px", marginRight: "8px" }}
                />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Escribe tu comentario"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary" onClick={handleCreateReview}>
            Agregar
          </button>
        </div>
      )}

      <div className="row g-4">
        {reviews.map((review) => (
          <div className="col-12" key={review.review_id}>
            <div className="card p-3 shadow-sm">
              <ReviewItem review={review} />
              {isLoggedIn && (
                <div className="mt-2 d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditingReview(review)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteReview(review.review_id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
