import axios from "axios";

export default function fetchArticles(topic) {
  console.log(topic);
  let url = "https://zia-nc-news.onrender.com/api/articles";
  const params = {
    topic: topic,
  };

  return axios.get(url, { params }).then((articles) => {
    console.log(articles);
    return articles.data;
  });
}
