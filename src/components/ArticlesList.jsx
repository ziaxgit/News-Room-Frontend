import { useEffect, useState } from "react";
import fetchArticles from "../../utils/fetchArticles";
import ArticleCard from "./ArticleCard";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles([...data.articles]);
      //   console.log(articles);
    });
  }, []);
  return (
    <section className="articles-container">
      {articles.map((article) => {
        // console.log(article,"<<<<");
        return <ArticleCard article={article} />;
      })}
    </section>
  );
}
