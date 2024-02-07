import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchArticles from "../../utils/fetchArticles";
import "../styles/ArticlePage.css";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetchArticles(article_id).then((data) => {
      setArticle({ ...data.article });
    });
  });

  const date = new Date(article.created_at);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return (
    <main className="article-and-comment-container">
      <section className="article-container">
        <h3>{article.title}</h3>
        <div className="author-date">
          <p>by {article.author}</p>
          <p> {formattedDate}</p>
        </div>
        <img src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
        <div className="votes-comment-count">
          <p>{article.votes} likes</p>
          <p>{article.comment_count} comments</p>
        </div>
      </section>
    </main>
  );
}
