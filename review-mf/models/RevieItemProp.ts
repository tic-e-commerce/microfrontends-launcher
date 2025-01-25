export interface ReviewItemProps {
  review: {
    user_id: number;
    rating: number;
    comment: string;
    review_date: string;
  };
}
