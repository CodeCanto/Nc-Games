import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReview, getReviewComments, updateVote } from "../api";
import { Comment } from "./Comment";

function Review() {
  const [comments, setComments] = useState([]);
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getReview(id).then((response) => {
      setReview(response);
    });
    getReviewComments(id).then((response) => {
      setComments(response);
    });
    setIsLoading(false);
  }, [id]);

  const handleIncrement = () => {
    if (!hasVoted) {
      updateVote(id, 1);
      setReview((prevReview) => {
        return { ...prevReview, votes: prevReview.votes + 1 };
      });
      setHasVoted(true);
    }
  };

  const handleDecrement = () => {
    if (!hasVoted) {
      updateVote(id, -1);
      setReview((prevReview) => {
        return { ...prevReview, votes: prevReview.votes - 1 };
      });
      setHasVoted(true);
    }
  };

  return (
    <div className="review-item-single">
      <h2>{review.title}</h2>
      <h3>Designed by {review.designer}</h3>
      <h4>Category: {review.category}</h4>
      <img src={review.review_img_url} alt="Review" />
      <p>{review.review_body}</p>
      <h5>User: {review.owner}</h5>
      <h5>Votes: {review.votes}</h5>
      {hasVoted ? (
        <p>Thank you for voting!</p>
      ) : (
        <div>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
        </div>
      )}
      <p>{review.created_at}</p>

      <h6>Comments</h6>
      <h5 className="comment-count">Comment Count: {review.comment_count}</h5>

      {comments.length === 0 ? (
        <p>No one has commented, be the first to comment here!</p>
      ) : (
        comments.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })
      )}
    </div>
  );
}

export default Review;
