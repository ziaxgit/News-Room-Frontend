import axios from "axios";

export default function fetchComments(articleId) {
  const url = `https://zia-nc-news.onrender.com/api/articles/${articleId}/comments`;
  return axios.get(url).then((comments) => {
    return comments.data;
  });
}
