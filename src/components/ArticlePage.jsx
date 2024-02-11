import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import fetchArticleById from "../../utils/fetchArticleById";
import "../styles/ArticlePage.css";
import LoadingScreeen from "./LoadingScreen";
import DisplayError from "./DisplayError";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import patchArticleVote from "../../utils/patchArticleVote";
import CommentsList from "./CommentsList";
import { TiHeartFullOutline } from "react-icons/ti";
import { MdOutlineInsertComment } from "react-icons/md";
import { BsHeartbreakFill } from "react-icons/bs";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});
  const [likeClick, setLikeClick] = useState(false);
  const [dislikeClick, setDislikeClick] = useState(false);
  const [originalVotes, setOriginalVotes] = useState(null); // retain original votes from api
  const [tempVotes, setTempVotes] = useState(null); // for optimistic rendering
  const [changeVotesBy, setChangeVotesBy] = useState(0); // value to send api
  const [errorVoteUpdate, setErrorVoteUpdate] = useState(false);

  useEffect(() => {
    fetchArticleById(article_id)
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
  }, [article_id]);

  function incrementVote() {
    if (!likeClick || tempVotes === originalVotes) {
      setChangeVotesBy(1);
      setTempVotes(tempVotes + 1);
      setLikeClick(true);
      setDislikeClick(false);
    }
    patchArticleVote(article_id, 1)
      .then()
      .catch(() => {
        setErrorVoteUpdate(true);
      });
  }
  function decrementVote() {
    if (!dislikeClick || tempVotes === originalVotes) {
      setChangeVotesBy(-1);
      setTempVotes(tempVotes - 1);
      setLikeClick(false);
      setDislikeClick(true);
    }
    patchArticleVote(article_id, -1)
      .then()
      .catch(() => {
        setErrorVoteUpdate(true);
      });
  }

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
          {tempVotes === 0 && (
            <p className="article-card-likes">
              <TiHeartFullOutline color="black" size={25} />
              {tempVotes}
            </p>
          )}
          {tempVotes > 0 && (
            <p className="article-card-likes">
              <TiHeartFullOutline color="red" size={25} />
              {tempVotes}
            </p>
          )}
          {tempVotes < 0 && (
            <p className="article-card-likes">
              <BsHeartbreakFill color="red" size={20} />
              {tempVotes}
            </p>
          )}

          <p className="comment-icon-text">
            <MdOutlineInsertComment size={25} />
            {article.comment_count}
          </p>
        </div>
        <div className="like-buttons">
          <button
            onClick={incrementVote}
            id={likeClick && tempVotes !== originalVotes ? "btn-clicked" : null}
          >
            <AiOutlineLike color="green" size={25} />
          </button>
          <button
            onClick={decrementVote}
            id={
              dislikeClick && tempVotes !== originalVotes ? "btn-clicked" : null
            }
          >
            <AiOutlineDislike color="red" size={25} />
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
      <CommentsList article_id={article_id} />
    </main>
  );
}
