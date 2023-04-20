export function Comment({ comment }) {
  const { author, body, created_at } = comment;

  return (
    <div className="comment-card">
      <p>{body}</p>
      <h4>
        Posted by {author} at {created_at}
      </h4>
    </div>
  );
}
