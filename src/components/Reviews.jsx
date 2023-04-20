import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviews } from "../api.js";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    getReviews(category).then((reviews) => {
      console.log(category, "<------------category");
      setReviews(reviews);
    });
  }, [category]);

  return (
    <ul style={{ listStyle: "none" }}>
      {reviews.map((review) => {
        return (
          <li key={review.review_id} className="review-item">
            <h2>{review.title}</h2>
            <img src={review.review_img_url} alt="Review" />
            <Link to={`/review/${review.review_id}`}>Full Review</Link>
            <h5>User: {review.owner}</h5>
            <h6>Votes: {review.votes}</h6>
            <p>{review.created_at}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default Reviews;
