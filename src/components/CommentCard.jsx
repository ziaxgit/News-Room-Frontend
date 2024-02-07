export default function CommentCard({ comment }) {
  const originalDate = new Date(comment.created_at);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  const formattedDate = originalDate.toLocaleDateString("en-GB", options);

  return (
    <div className="comment-card">
      <div>
        <p className="comment-author">
          by {comment.author} at {formattedDate}
        </p>
        <p>{comment.body}</p>
      </div>
      <p className="comment-likes">{comment.votes} likes</p>
    </div>
  );
}
