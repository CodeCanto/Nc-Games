import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReview } from "../api";

function Review() {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getReview(id).then((response) => {
      setReview(response);
    });
    setIsLoading(false);
  }, [id]);

  return (
    <div>
      <>
        <h2>{review.title}</h2>
        <h3>Designed by {review.designer}</h3>
        <h4>Category: {review.category}</h4>
        <img src={review.review_img_url} alt="Review" />
        <p>{review.review_body}</p>
        <h5>User: {review.owner}</h5>
        <h6>Votes: {review.votes}</h6>
        <p>{review.created_at}</p>
      </>
    </div>
  );
}

export default Review;
