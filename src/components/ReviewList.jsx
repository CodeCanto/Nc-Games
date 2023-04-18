import axios from "axios";
import { useEffect, useState } from "react";

function ReviewList(newReviewID) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("https://nc-games-m65q.onrender.com/api/reviews")
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reviews]);
  //

  return (
    <ol>
      {reviews.map((review, index) => {
        return (
          <li key={index} className="review-item">
            <h2>{review.title}</h2>
            <h3>Designed by {review.designer}</h3>
            <h4>Category: {review.category}</h4>
            <img src={review.review_img_url} alt="Review" />{" "}
            <p>{review.review_body}</p>
            <h5>User: {review.owner}</h5>
            <footer>Votes: {review.votes}</footer>
            <h6>{review.created_at}</h6>
          </li>
        );
      })}
    </ol>
  );
}

export default ReviewList;
