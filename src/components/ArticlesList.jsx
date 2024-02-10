import { useEffect, useState } from "react";
import fetchArticles from "../../utils/fetchArticles";
import ArticleCard from "./ArticleCard";
import LoadingScreen from "./LoadingScreen";
import "../styles/ArticlesList.css";
import DisplayError from "./DisplayError";
import About from "./About";
import { useLocation } from "react-router-dom";

export default function ArticlesList({ topic }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    if (pathname === "/") {
      fetchArticles()
        .then((data) => {
          setArticles([...data.articles]);
          SetIsLoading(false);
        })
        .catch((err) => {
          setErrorInfo({ ...err.response });
          setError(true);
        });
    }
    if (pathname.includes(topic)) {
      fetchArticles(topic)
        .then((data) => {
          setArticles([...data.articles]);
          SetIsLoading(false);
        })
        .catch((err) => {
          setErrorInfo({ ...err.response });
          setError(true);
        });
    }
  }, [articles]);
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
      {pathname === "/" && <About />}
      <section className="articles-container">
        {articles.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </section>
    </>
  );
}
