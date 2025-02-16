import React, { useEffect, useState, useRef } from "react";
import {
  getReviewsByProductId,
  createReview,
  updateReview,
  deleteReview,
} from "@/services/review.service";
import ReviewItem from "../review-item/review-item.component";
import { Review } from "@/models/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faStar,
  faCheckCircle,
  faTimesCircle,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const ReviewsList = ({ productId }: { productId: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Ref para el formulario de edición
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (storedUserId && token) {
      const parsedUserId = parseInt(storedUserId, 10);
      if (!isNaN(parsedUserId)) {
        setLoggedUserId(parsedUserId);
        setIsLoggedIn(true);
      }
    }

    if (!productId) return;

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

  const showFeedback = (message: string, type: "success" | "error") => {
    setFeedbackMessage({ message, type });
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleCreateReview = async () => {
    if (!newReview.rating || !newReview.comment || !loggedUserId) {
      showFeedback("Por favor completa todos los campos.", "error");
      return;
    }

    try {
      const createdReview = await createReview({
        product_id: productId,
        user_id: loggedUserId,
        rating: newReview.rating,
        comment: newReview.comment,
        review_date: new Date().toISOString(),
      });
      setReviews([...reviews, createdReview]);
      setNewReview({ rating: 0, comment: "" });
      showFeedback("Reseña agregada con éxito.", "success");
    } catch (error) {
      console.error("Error al crear la reseña:", error);
      showFeedback("Error al agregar la reseña.", "error");
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setNewReview({ rating: review.rating, comment: review.comment });

    // Mover el scroll hasta el formulario de edición
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleUpdateReview = async () => {
    if (!editingReview || !loggedUserId) return;

    try {
      const updatedReview = await updateReview(editingReview.review_id, {
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.review_id === editingReview.review_id ? updatedReview : review
        )
      );
      setEditingReview(null);
      setNewReview({ rating: 0, comment: "" });
      showFeedback("Reseña actualizada con éxito.", "success");
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
      showFeedback("Error al actualizar la reseña.", "error");
    }
  };

  const handleDeleteReview = async (reviewId: number, userId: number) => {
    if (!loggedUserId || loggedUserId !== userId) {
      showFeedback("No puedes eliminar esta reseña.", "error");
      return;
    }

    if (!confirm("¿Estás seguro de que quieres eliminar esta reseña?")) return;

    try {
      await deleteReview(reviewId);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.review_id !== reviewId)
      );
      showFeedback("Reseña eliminada con éxito.", "success");
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
      showFeedback("Error al eliminar la reseña.", "error");
    }
  };

  if (loading) {
    return <p>Cargando reseñas...</p>;
  }

  return (
    <div className="reviews-list container mt-4">
      <h5 className="fw-bold mb-3">Reseñas de Clientes</h5>

      {feedbackMessage && (
        <div
          className={`alert ${
            feedbackMessage.type === "success"
              ? "alert-success"
              : "alert-danger"
          } fixed-top text-center`}
        >
          <FontAwesomeIcon
            icon={
              feedbackMessage.type === "success" ? faCheckCircle : faTimesCircle
            }
            className="me-2"
          />
          {feedbackMessage.message}
        </div>
      )}

      {isLoggedIn && (
        <div ref={formRef} className="card p-4 mb-4 shadow-sm">
          <h6 className="fw-bold mb-3">
            {editingReview ? "Editar reseña" : "Agregar una nueva reseña"}
          </h6>
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
                  onClick={() =>
                    setNewReview((prev) => ({ ...prev, rating: star }))
                  }
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
          <button
            className="btn btn-primary"
            onClick={editingReview ? handleUpdateReview : handleCreateReview}
          >
            {editingReview ? "Guardar cambios" : "Agregar"}
          </button>
        </div>
      )}

      <div className="row g-4">
        {reviews.map((review) => (
          <div className="col-12" key={review.review_id}>
            <div className="card p-3 shadow-sm">
              <ReviewItem review={review} />
              {isLoggedIn && review.user_id === loggedUserId && (
                <div className="mt-2 d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditReview(review)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDeleteReview(review.review_id, review.user_id)
                    }
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
