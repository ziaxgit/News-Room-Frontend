import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

  function navigateToTopic(topic) {
    navigate(`/articles/${topic}`);
  }

  return (
    <li className="dropdown-parent" ref={dropdownRef}>
      <a onClick={toggleDropdown} href="">
        Browse topics
      </a>
      {isOpen && (
        <div className="dropdown-menu">
          <li>
            <a onClick={() => navigateToTopic("coding")} href="">
              Coding
            </a>
          </li>
          <li>
            <a onClick={() => navigateToTopic("cooking")} href="">
              Cooking
            </a>
          </li>
          <li>
            <a onClick={() => navigateToTopic("football")} href="">
              Football
            </a>
          </li>
        </div>
      )}
    </li>
  );
}
