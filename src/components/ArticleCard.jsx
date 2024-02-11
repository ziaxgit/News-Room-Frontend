import { useNavigate } from "react-router-dom";
import { TiHeartFullOutline } from "react-icons/ti";
import { MdOutlineInsertComment } from "react-icons/md";
import fetchUsers from "../../utils/fetchUsers";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";

export default function ArticleCard({ article }) {
  const date = new Date(article.created_at);
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    fetchUsers(article.author).then((response) => {
      setImgUrl(response.user.avatar_url);
      setIsImgLoading(false);
    });
  }, [article]);

  function handleClick() {
    navigate(`/articles/${article.article_id}`);
  }
  return (
    <div onClick={handleClick} className="article-card">
      <img src={article.article_img_url} alt={article.title} />
      <h3>{article.title}</h3>
      <div className="author-date">
        <p className="article-card-author-pic">
          {isImgLoading ? null : <img src={imgUrl} alt="" />}
          {article.author}
        </p>
        <p className="article-date">
          <MdDateRange size={20} /> {formattedDate}
        </p>
      </div>
      <div className="votes-comment-count">
        <p className="article-card-likes">
          <TiHeartFullOutline color="red" size={30} />
          {article.votes}
        </p>
        <p className="comment-icon-text">
          <MdOutlineInsertComment size={25} /> {article.comment_count} comments
        </p>
      </div>
    </div>
  );
}
