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

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");
  const [isReset, setIsReset] = useState(false);

  const sortByOptions = [
    { value: "title", label: "Title" },
    { value: "votes", label: "Votes" },
    { value: "article_id", label: "Article id" },
    { value: "created_at", label: "Created at (default)" },
  ];
  const orderByOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending (default)" },
  ];

  useEffect(() => {
    fetchArticles(topic, sortBy, orderBy)
      .then((data) => {
        setArticles([...data.articles]);
        SetIsLoading(false);
      })
      .catch((err) => {
        setErrorInfo({ ...err.response });
        setError(true);
      });
    // }
  }, [topic, sortBy, orderBy]);

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
      <div className="query-container">
        <Dropdown
          onChange={(e) => {
            setSortBy(e.value);
          }}
          className="sort-by"
          options={sortByOptions}
          value={isReset ? "Created at (default)" : "Sort by"}
          placeholder="sort by"
        />

        <Dropdown
          onChange={(e) => {
            setOrderBy(e.value);
          }}
          className="order-by"
          options={orderByOptions}
          value={isReset ? "Descending (default)" : "Order by"}
          placeholder="order by"
        />
        <button
          style={{
            "font-size": "15px",
          }}
          onClick={() => {
            setIsReset(!isReset);
            setSortBy("created_at");
            setOrderBy("desc");
          }}
        >
          Reset
        </button>
      </div>
      <section className="articles-container">
        {articles.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </section>
    </>
  );
}
