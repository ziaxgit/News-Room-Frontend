import axios from "axios";

export default function NewArticle(newArticleInfo) {
  return axios
    .post(`https://zia-nc-news.onrender.com/api/articles`, newArticleInfo)
    .then((response) => {
      return response.data;
    });
}
