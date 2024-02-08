import axios from "axios";

export default function patchArticleVote(article_id, changeVotesBy) {
  const dataToSend = { inc_votes: changeVotesBy };
  return axios
    .patch(
      `https://zia-nc-news.onrender.com/api/articles/${article_id}`,
      dataToSend
    )
    .then((response) => {
      return response.data;
    });
}
