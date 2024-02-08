import axios from "axios";

export default function fetchUsers(username) {
  let url = "https://zia-nc-news.onrender.com/api/users";
  if (username !== undefined) {
    url += `/${username}`;
  }
  return axios.get(url).then((response) => {
    return response.data;
  });
}
