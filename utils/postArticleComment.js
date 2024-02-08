import axios from "axios";

export default function postArticleComment(data, article_id) {
  return axios
    .post(
      `https://zia-nc-news.onrender.com/api/articles/${article_id}/comments`,
      data
    )
    .then((response) => {
      return response;
    });
}
