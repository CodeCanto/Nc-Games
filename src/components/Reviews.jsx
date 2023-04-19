import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api.js";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <ol>
      {reviews.map((review) => {
        return (
          <li key={review.review_id} className="review-item">
            <h2>{review.title}</h2>
            <img src={review.review_img_url} alt="Review" />
            <Link to={`/reviews/${review.review_id}`}>Full Review</Link>
            <h5>User: {review.owner}</h5>
            <h6>Votes: {review.votes}</h6>
            <p>{review.created_at}</p>
          </li>
        );
      })}
    </ol>
  );
}

export default Reviews;
