import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function TopicDropdown({ menuOpen, setMenuOpen }) {
  const [isOpen, setIsOpen] = useState(false);
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

  function closeNavbar() {
    setMenuOpen(!menuOpen);
  }
  return (
    <li className="dropdown-parent" ref={dropdownRef}>
      <a onClick={toggleDropdown} href="">
        Browse topics
      </a>
      {isOpen && (
        <div className="dropdown-menu">
          <li>
            {/* <Link onClick={closeNavbar} to={"/articles/coding"}> */}
            <Link
              onClick={() => {
                closeNavbar;
                setIsOpen(!isOpen);
              }}
              to={"/articles?topic=coding"}
            >
              Coding
            </Link>
          </li>
          <li>
            {/* <Link onClick={closeNavbar} to={"/articles/cooking"}> */}
            <Link
              onClick={() => {
                closeNavbar;
                setIsOpen(!isOpen);
              }}
              to={"/articles?topic=cooking"}
            >
              Cooking
            </Link>
          </li>
          <li>
            {/* <Link onClick={closeNavbar} to={"/articles/football"}> */}
            <Link
              onClick={() => {
                closeNavbar;
                setIsOpen(!isOpen);
              }}
              to={"/articles?topic=football"}
            >
              Football
            </Link>
          </li>
        </div>
      )}
    </li>
  );
}
