import { useEffect, useState } from "react";
import fetchUsers from "../../utils/fetchUsers";

export default function UserProfile({ loggedUser }) {
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    fetchUsers(loggedUser).then(({ user }) => {
      setUserImg(user.avatar_url);
    });
  }, [loggedUser]);

  return (
    <div className="img-user">
      <img className="user-profile-pic" src={userImg} alt="" />
      <p>{loggedUser}</p>
    </div>
  );
}
