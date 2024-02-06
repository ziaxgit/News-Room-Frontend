import "./App.css";
import Navbar from "./components/Navbar";
import ArticlesList from "./components/ArticlesList";
import "./components/Homepage.css";

export default function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <ArticlesList />
    </div>
  );
}
