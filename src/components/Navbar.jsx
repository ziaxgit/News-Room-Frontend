import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import UserProfile from "./UserProfile";
import TopicDropdown from "./TopicDropdown";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

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
        <div className="news-icon">
          <IoNewspaperOutline />
        </div>
        &nbsp;News Room
      </Link>
      <div className="menu" onClick={toggleNavbar}>
        {!menuOpen && (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        )}
        {menuOpen && (
          <div className="menu-close">
            <MdOutlineClose />
          </div>
        )}
      </div>
      <ul className={menuOpen ? `open` : ""}>
        <li>
          <Link onClick={toggleNavbar} to="/">
            Home
          </Link>
        </li>
        <TopicDropdown setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
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
