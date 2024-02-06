import axios from "axios";

let url = "https://zia-nc-news.onrender.com/api/articles";

export default function fetchArticles(articleId) {
  if (articleId === undefined) {
    return axios.get(url).then((articles) => {
      //   console.log(articles.data);
      return articles.data;
    });
  }
}
