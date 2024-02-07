import { useNavigate } from "react-router-dom";
export default function ArticleCard({ article }) {
  const date = new Date(article.created_at);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/articles/${article.article_id}`);
  }
  return (
    <div onClick={handleClick} className="article-card">
      <img src={article.article_img_url} alt={article.title} />
      <h3>{article.title}</h3>
      <div className="author-date">
        <p>by {article.author}</p>
        <p> {formattedDate}</p>
      </div>
      <div className="votes-comment-count">
        <p>{article.votes} likes</p>
        <p>{article.comment_count} comments</p>
      </div>
    </div>
  );
}
