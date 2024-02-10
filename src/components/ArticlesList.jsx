import { useEffect, useState } from "react";
import fetchArticles from "../../utils/fetchArticles";
import ArticleCard from "./ArticleCard";
import LoadingScreen from "./LoadingScreen";
import "../styles/ArticlesList.css";
import DisplayError from "./DisplayError";

export default function ArticlesList({ topic }) {
  console.log(topic);
  const [articles, setArticles] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});

  useEffect(() => {
    fetchArticles(topic)
      .then((data) => {
        setArticles([...data.articles]);
        SetIsLoading(false);
      })
      .catch((err) => {
        setErrorInfo({ ...err.response });
        setError(true);
      });
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <DisplayError error={errorInfo} />;
  }
  return (
    <>
      {topic && (
        <h2 className="topic-header">
          Showing all <span>{topic}</span>
          &nbsp;articles
        </h2>
      )}
      <section className="articles-container">
        {articles.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </section>
    </>
  );
}
