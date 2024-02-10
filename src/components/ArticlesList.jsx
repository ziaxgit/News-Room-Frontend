import { useEffect, useState } from "react";
import fetchArticles from "../../utils/fetchArticles";
import ArticleCard from "./ArticleCard";
import LoadingScreen from "./LoadingScreen";
import "../styles/ArticlesList.css";
import DisplayError from "./DisplayError";
import About from "./About";
import { useLocation } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useSearchParams } from "react-router-dom";

const options = ["one", "two", "three"];
const defaultOption = options[0];

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");

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
    // }
  }, [topic]);

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
      {/* <Dropdown
        options={options}
        value={defaultOption}
        placeholder="Select an option"
      /> */}
      <section className="articles-container">
        {articles.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </section>
    </>
  );
}
