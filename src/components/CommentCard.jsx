import { useState } from "react";
import deleteComment from "../../utils/deleteComment";
import DisplayError from "./DisplayError";
export default function CommentCard({ comment, loggedUser, setComments }) {
  const originalDate = new Date(comment.created_at);
  const [error, setError] = useState(false);

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

  function handleDeleteComment(comment_id) {
    deleteComment(comment_id)
      .then()
      .catch((err) => {
        setError(true);
      });
  }

  if (error) {
    return <DisplayError />;
  }
  return (
    <>
      <div className="comment-card">
        <div>
          <p className="comment-author">
            by {comment.author} at {formattedDate}
          </p>
          <p>{comment.body}</p>
        </div>
        <p className="comment-likes">{comment.votes} likes</p>
        {comment.author === loggedUser && (
          <button
            onClick={() => handleDeleteComment(comment.comment_id)}
            className="comment-delete"
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
}
