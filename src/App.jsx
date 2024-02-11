import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";
import UsersList from "./components/UsersList";
import { useState } from "react";
import UserContext from "./UserContext";
import NewArticle from "./components/NewArticle";
import InvalidPath from "./components/InvalidPath";

export default function App() {
  const [loggedUser, setLoggedUser] = useState("happyamy2016");
  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/post-new-article" element={<NewArticle />} />
        <Route path="*" element={<InvalidPath />} />
      </Routes>
    </UserContext.Provider>
  );
}
