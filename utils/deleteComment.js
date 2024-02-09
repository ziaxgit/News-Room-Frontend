import axios from "axios";

export default function deleteComment(comment_id) {
  let url = `https://zia-nc-news.onrender.com/api/comments/${comment_id}s`;

  return axios.delete(url).then((response) => {
    return response;
  });
}
