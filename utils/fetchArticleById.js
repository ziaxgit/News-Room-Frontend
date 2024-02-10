import axios from "axios";

export default function fetchArticleById(articleId) {
  let url = `https://zia-nc-news.onrender.com/api/articles/${articleId}`;

  return axios.get(url).then((articles) => {
    return articles.data;
  });
}
