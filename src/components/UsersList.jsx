import { useEffect, useState, useContext } from "react";
import fetchUsers from "../../utils/fetchUsers";
import "../styles/UsersList.css";
import UserContext from "../UserContext";
import LoadingScreeen from "./LoadingScreen";
import DisplayError from "./DisplayError";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers([...response.users]);
        console.log(error);
        setIsUsersLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsUsersLoading(false);
        setError(true);
        setErrorInfo({ ...err.response });
      });
  }, []);

  if (isUsersLoading) {
    return <LoadingScreeen />;
  }
  if (error) {
    return <DisplayError error={errorInfo} />;
  }
  return (
    <>
      <h1 className="users-header">Users</h1>
      <p className="users-header">
        <strong>Click on a user to log in as them</strong>{" "}
      </p>
      <section className="userlist-container">
        {users.map((user) => {
          return (
            <div
              onClick={() => {
                setLoggedUser(user.username);
              }}
              className={`user-card ${
                loggedUser === user.username && "logged-user"
              }`}
            >
              <img src={user.avatar_url} alt={user.name} />
              <p>{user.name}</p>
              <p>{user.username}</p>
              {loggedUser === user.username && <span>Logged </span>}
            </div>
          );
        })}
      </section>
    </>
  );
}
