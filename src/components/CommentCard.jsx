import { useEffect, useState } from "react";
import deleteComment from "../../utils/deleteComment";
import DisplayError from "./DisplayError";
import { TiHeartFullOutline } from "react-icons/ti";
import { BsHeartbreakFill } from "react-icons/bs";

export default function CommentCard({
  comment,
  loggedUser,
  setIsDelete,
  isDelete,
  setCommentPosted,
}) {
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
    setCommentPosted(false);
    deleteComment(comment_id)
      .then(() => {
        setIsDelete(!isDelete);
      })
      .catch(() => {
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

        {comment.votes > 0 && (
          <p className="comment-likes">
            <TiHeartFullOutline color="red" size={20} />
            {comment.votes}
          </p>
        )}

        {comment.votes === 0 && (
          <p className="comment-likes">
            <TiHeartFullOutline color="black" size={20} />
            {comment.votes}
          </p>
        )}

        {comment.votes < 0 && (
          <p className="comment-likes">
            <BsHeartbreakFill color="red" size={16} /> {comment.votes}
          </p>
        )}

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
