import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TopicDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  function toggleDropdown(e) {
    setIsOpen(!isOpen);
    e.preventDefault();
  }

  return (
    <li className="dropdown-parent" ref={dropdownRef}>
      <a onClick={toggleDropdown} href="">
        Browse topics
      </a>
      {isOpen && (
        <div className="dropdown-menu">
          <li>
            <Link to={"/articles/coding"}>Coding</Link>
          </li>
          <li>
            <Link to={"/articles/cooking"}>Cooking</Link>
          </li>
          <li>
            <Link to={"/articles/football"}>Football</Link>
          </li>
        </div>
      )}
    </li>
  );
}
