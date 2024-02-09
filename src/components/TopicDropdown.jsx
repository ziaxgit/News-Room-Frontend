import { useState } from "react";

export default function TopicDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="dropdown-parent">
      <a
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.preventDefault();
        }}
        href=""
      >
        Browse topics
      </a>
      {isOpen && (
        <div className="dropdown-menu">
          <li>
            <a href="">Coding</a>
          </li>
          <li>
            <a href="">Cooking</a>
          </li>
          <li>
            <a href="">Football</a>
          </li>
        </div>
        // <div className="dropdown-menu">
        //   <button>Coding</button>
        //   <button>Cooking</button>
        //   <button>Football</button>
        // </div>
      )}
    </li>
  );
}
