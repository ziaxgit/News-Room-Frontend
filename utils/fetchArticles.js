import axios from "axios";

export default function fetchArticles(articleId) {
  let url = "https://zia-nc-news.onrender.com/api/articles";

  if (articleId !== undefined) {
    url += `/${articleId}`;
  }

  return axios.get(url).then((articles) => {
    return articles.data;
  });
}
