import axios from "axios";

export default function fetchArticles(topic) {
  let url = "https://zia-nc-news.onrender.com/api/articles";

  if (topic !== undefined) {
    url += `?topic=${topic}`;
  }

  return axios.get(url).then((articles) => {
    console.log(articles);
    return articles.data;
  });
}
