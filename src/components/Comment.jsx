import { deleteComment } from "../api";
import { useState } from "react";

export function Comment({ comment }) {
  const { author, body, created_at } = comment;
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    deleteComment(comment.comment_id)
      .then(() => {
        setIsDeleted(true);
      })
      .catch((error) => {
        console.log("Error deleting comment: ", error);
      });
  };

  return (
    <div className="comment-card">
      {isDeleted ? (
        <p>Your comment was deleted.</p>
      ) : (
        <>
          <p>{body}</p>
          <h4>
            Posted by {author} at {created_at}
          </h4>
          {author === "grumpy19" && (
            <>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
