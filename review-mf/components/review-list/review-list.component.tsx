import React, { useEffect, useState } from "react";
import { getReviewsByProductId } from "@/services/review.service";
import ReviewItem from "../review-item/review-item.component";
import { Review } from "@/models/Review";

const ReviewsList = ({ productId }: { productId: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByProductId(productId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (!reviews.length) {
    return <p>No reviews available for this product.</p>;
  }

  return (
    <div className="reviews-list container mt-4">
      <h5 className="fw-bold mb-3">Customer Reviews</h5>
      <div className="row g-3">
        {reviews.map((review) => (
          <div className="col-12" key={review.review_id}>
            <ReviewItem review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
