import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchArticles from "../../utils/fetchArticles";
import fetchComments from "../../utils/fetchComments";
import CommentCard from "./CommentCard";
import "../styles/ArticlePage.css";
import LoadingScreeen from "./LoadingScreen";
import DisplayError from "./DisplayError";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import patchArticleVote from "../../utils/patchArticleVote";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});
  const [likeClick, setLikeClick] = useState(false);
  const [dislikeClick, setDislikeClick] = useState(false);
  const [originalVotes, setOriginalVotes] = useState(null);
  const [tempVotes, setTempVotes] = useState(null);
  const [changeVotesBy, setChangeVotesBy] = useState(0);
  const [errorVoteUpdate, setErrorVoteUpdate] = useState(false);

  useEffect(() => {
    fetchArticles(article_id)
      .then((data) => {
        setArticle({ ...data.article });
        setIsArticleLoading(false);
        window.scrollTo(0, 0);
        setOriginalVotes(data.article.votes);
        setTempVotes(data.article.votes);
      })
      .catch((err) => {
        setErrorInfo({ ...err.response });
        setIsArticleLoading(false);
        setError(true);
      });

    fetchComments(article_id).then((data) => {
      setComments([...data.comments]);
    });
  }, [article_id]);

  function incrementVote() {
    if (!likeClick || tempVotes === originalVotes) {
      setChangeVotesBy(1);
      setTempVotes(tempVotes + 1);
      setLikeClick(true);
      setDislikeClick(false);
    }
  }
  function decrementVote() {
    if (!dislikeClick || tempVotes === originalVotes) {
      setChangeVotesBy(-1);
      setTempVotes(tempVotes - 1);
      setLikeClick(false);
      setDislikeClick(true);
    }
  }
  useEffect(() => {
    patchArticleVote({ article_id, changeVotesBy })
      .then()
      .catch((err) => {
        setErrorVoteUpdate(true);
      });
  }, [tempVotes]);

  const date = new Date(article.created_at);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  if (isArticleLoading) {
    return <LoadingScreeen />;
  }

  if (error) {
    return <DisplayError error={errorInfo} />;
  }

  return (
    <main className="article-and-comment-container">
      <section className="article-container">
        <h2>{article.title}</h2>
        <div className="author-date">
          <p>by {article.author}</p>
          <p> {formattedDate}</p>
        </div>
        <img src={article.article_img_url} alt={article.title} />
        <p className="article-body">{article.body}</p>
        <div className="votes-comment-count">
          <p>{tempVotes} likes</p>
          <p>{article.comment_count} comments</p>
        </div>
        <div className="like-buttons">
          <button
            onClick={incrementVote}
            id={likeClick && tempVotes !== originalVotes ? "btn-clicked" : null}
          >
            <AiOutlineLike size={25} />
          </button>
          <button
            onClick={decrementVote}
            id={
              dislikeClick && tempVotes !== originalVotes ? "btn-clicked" : null
            }
          >
            <AiOutlineDislike size={25} />
          </button>
          {likeClick && tempVotes !== originalVotes ? (
            <p>You liked this!</p>
          ) : null}
          {dislikeClick && tempVotes !== originalVotes ? (
            <p>You disliked this!</p>
          ) : null}
          {errorVoteUpdate ? <p>Failed to like. Api error soz x_x</p> : null}
        </div>
      </section>

      <section className="comments-container">
        <h3 className="comment-heading">Comments</h3>
        {comments.map((comment) => {
          return <CommentCard comment={comment} />;
        })}
      </section>
    </main>
  );
}
