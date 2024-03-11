import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview, getReviewComments, updateVote, postComment } from "../api";
import { Comment } from "./Comment";
import './Review.css'

function Review() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getReview(id).then((response) => {
      setReview({
        ...response,
        created_at: response.created_at.replace(/T|Z/g, " at ").replace(/\..*$/g, ".")
      });
    });
    getReviewComments(id).then((response) => {
      setComments(response);
    });
    setIsLoading(false);
  }, [id]);

  const handleUpvote = () => {
    if (!hasVoted) {
      updateVote(id, 1);
      setReview((prevReview) => {
        return { ...prevReview, votes: prevReview.votes + 1 };
      });
      setHasVoted(true);
    }
  };

  const handleDownvote = () => {
    if (!hasVoted) {
      updateVote(id, -1);
      setReview((prevReview) => {
        return { ...prevReview, votes: prevReview.votes - 1 };
      });
      setHasVoted(true);
    }
  };

  const handleComment = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormDisabled(true);
    postComment(review.review_id, commentText).then((response) => {
      setHasCommented(true);
    });
  };

  return (
    <div className="review-focus-container">
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
      <div className="review-focus-container">
        <div className="content-header-section">
          <h2>{review.title}</h2>
          <h3>Designed by {review.designer}</h3>
          <h4>Category: {review.category}</h4>
          <img id="review-img" src={review.review_img_url} alt="Review" />
          <div className="review-content-stats">  
            <h5 className="review-content-stats-header">{review.votes} votes</h5>
            {hasVoted ? (
            <p>Thank you for voting!</p>
            ) : (
            <div id="review-vote-buttons">
              <button onClick={handleUpvote}>Upvote</button>
              <button onClick={handleDownvote}>Downvote</button>
            </div>
                  )}
          </div>
        </div>
        <div className="review-content-comment-container">
          <div id="review-body">
            <p>"{review.review_body}"</p>
            <h5>Written by {review.owner}</h5>
            <p>Posted on {review.created_at}</p>
          </div>  
            <div className="review-comment-section">
              <h5 className="comment-count">
                {review.comment_count} comments
              </h5>
              {hasCommented ? (
              <p>Your comment was posted!</p>
              ) : (
              <form onSubmit={handleSubmit}>
                <textarea
                  id="review-comment-box"
                  value={commentText}
                  onChange={handleComment}
                  placeholder="Join the discussion here"
                  disabled={isFormDisabled}
                />
                <button id="comment-submit-button" type="submit" disabled={isFormDisabled}>
                  Submit
                </button>
              </form>
              )}
              {comments.length === 0 ? (
              <p>No one has commented, be the first to comment here!</p>
              ) : (
              comments.map((comment) => {
              return <Comment key={comment.comment_id} comment={comment} />;
              })
              )}
            </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Review;
