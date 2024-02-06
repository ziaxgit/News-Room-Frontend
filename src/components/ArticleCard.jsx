export default function ArticleCard({ article }) {
  const date = new Date(article.created_at);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <img src={article.article_img_url} alt={article.title} />
      <p>posted on {formattedDate}</p>
      <p>by {article.author}</p>
      <div className="votes-comment-count">
        <p>{article.votes} votes</p>
        <p>{article.comment_count} comments</p>
      </div>
    </div>
  );
}
