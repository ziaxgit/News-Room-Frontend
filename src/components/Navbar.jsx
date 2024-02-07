import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleNavbar() {
    setMenuOpen(!menuOpen);
  }
  return (
    <nav>
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
        <li>
          <Link onClick={toggleNavbar} to="/login">
            Log In
          </Link>
        </li>
      </ul>
    </nav>
  );
}
