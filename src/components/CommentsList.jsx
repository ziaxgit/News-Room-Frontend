import { useEffect, useState, useContext } from "react";
import fetchComments from "../../utils/fetchComments";
import CommentCard from "./CommentCard";
import postArticleComment from "../../utils/postArticleComment";
import "../styles/comments.css";
import UserContext from "../UserContext";

export default function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentPosted, setCommentPosted] = useState(false);
  const { loggedUser } = useContext(UserContext);
  const [isCommentPosting, setIsCommentPosting] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    fetchComments(article_id).then((data) => {
      setComments([...data.comments]);
    });
  }, [isCommentPosting, isDelete]);

  function handleCommentSubmit(e) {
    if (commentText && /^\s*$/.test(commentText) === false) {
      e.preventDefault();
      setIsCommentPosting(true);
      postArticleComment(
        { username: loggedUser, body: commentText },
        article_id
      )
        .then(() => {
          setCommentPosted(true);
          setIsCommentPosting(false);
        })
        .catch(() => {
          setCommentPosted(false);
          setCommentError(true);
        });
    }
    setCommentText("");
  }

  return (
    <section className="comments-container">
      <h3 className="comment-heading">Comments</h3>
      <form className="comment-form" action="">
        <label htmlFor="comment">Join the discussion</label>
        <textarea
          required
          name="comment"
          rows="3"
          value={commentText}
          placeholder="Type your comment here..."
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        ></textarea>
        {isCommentPosting && "Posting your comment..."}
        {commentPosted && !isCommentPosting && (
          <p className="comment-success">Comment posted successfully :)</p>
        )}
        {commentError && (
          <p className="comment-fail">Failed to post comment :(</p>
        )}
        <button onClick={handleCommentSubmit} type="submit">
          Submit
        </button>
      </form>
      {comments.map((comment) => {
        return (
          <CommentCard
            comment={comment}
            loggedUser={loggedUser}
            setIsDelete={setIsDelete}
            isDelete={isDelete}
            setCommentPosted={setCommentPosted}
          />
        );
      })}
    </section>
  );
}
