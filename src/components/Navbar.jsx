import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedUser } = useContext(UserContext);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function toggleNavbar() {
    setMenuOpen(!menuOpen);
  }
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="title">
        Zia's News
      </Link>
      <div className="menu" onClick={toggleNavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? `open` : ""}>
        <li></li>
        <li>
          <Link onClick={toggleNavbar} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={toggleNavbar} to="/users">
            Users
          </Link>
        </li>
        {!loggedUser ? (
          <li>
            <Link onClick={toggleNavbar} to="/login">
              Log In
            </Link>
          </li>
        ) : (
          <li className="profile-pic">
            <Link onClick={toggleNavbar} to="/users">
              <UserProfile loggedUser={loggedUser} />
              {/* {loggedUser} */}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
