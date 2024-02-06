import { useEffect, useState } from "react";
import fetchArticles from "../../utils/fetchArticles";
import ArticleCard from "./ArticleCard";
import LoadingScreen from "./LoadingScreen";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles([...data.articles]);
      SetIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <section className="articles-container">
      {articles.map((article) => {
        return <ArticleCard article={article} />;
      })}
    </section>
  );
}
