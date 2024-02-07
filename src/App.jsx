import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </>
  );
}
