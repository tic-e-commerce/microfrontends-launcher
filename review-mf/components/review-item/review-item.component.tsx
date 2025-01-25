import { ReviewItemProps } from "@/models/RevieItemProp";
import React from "react";

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { rating, comment, review_date, user_id } = review;

  return (
    <div
      className="review-item p-3 border rounded shadow-sm bg-white"
      style={{ borderRadius: "10px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-bold">User #{user_id}</span>
        <span className="text-warning">
          {"⭐".repeat(rating)} <span className="text-muted">({rating}/5)</span>
        </span>
      </div>
      <p className="mb-2 text-muted">{comment}</p>
      <small className="text-muted">
        {new Date(review_date).toDateString()}
      </small>
    </div>
  );
};

export default ReviewItem;
