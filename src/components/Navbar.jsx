import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
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
          <NavLink onClick={toggleNavbar} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink onClick={toggleNavbar} to="/users">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink onClick={toggleNavbar} to="/login">
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
