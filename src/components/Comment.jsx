export function Comment({ comment }) {
  const { author, body, created_at } = comment;

  return (
    <div>
      <h5>Posted at {created_at}</h5>
      <p>{body}</p>
      <h4>Posted by {author}</h4>
    </div>
  );
}
