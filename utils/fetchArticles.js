import axios from "axios";

export default function fetchArticles(topic, sortBy, orderBy) {
  let url = "https://zia-nc-news.onrender.com/api/articles";
  const params = {
    topic: topic,
    sort_by: sortBy,
    order: orderBy,
  };

  return axios.get(url, { params }).then((articles) => {
    return articles.data;
  });
}
