import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchArticles from "../../utils/fetchArticles";
import fetchComments from "../../utils/fetchComments";
import CommentCard from "./CommentCard";
import "../styles/ArticlePage.css";
import LoadingScreeen from "./LoadingScreen";
import DisplayError from "./DisplayError";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});

  useEffect(() => {
    fetchArticles(article_id)
      .then((data) => {
        setArticle({ ...data.article });
        setIsArticleLoading(false);
        window.scrollTo(0, 0);
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
          <p>{article.votes} likes</p>
          <p>{article.comment_count} comments</p>
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
