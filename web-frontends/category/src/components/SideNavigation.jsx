import React, { useContext, useState } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { Link } from "react-router-dom";

const SideNavigation = ({ getClickedText }) => {

    const categories = useContext(CategoryContext);

    const [hoveredText, setHoveredText] = useState(null);
    const [hoveredPositionY, setHoveredPositionY] = useState(0);
    const [clickedText, setClickedText] = useState(null);
    const [clickedPositionY, setClickedPositionY] = useState(0);

    const handleMouseEnter = (e) => {
      setHoveredText(e.target.innerText);
      setHoveredPositionY(e.target.getBoundingClientRect().top + window.scrollY);
    };

    const handleMouseLeave = (e) => {
        setHoveredText(null);
    };

    const handleMouseClick = (e) => {
        setClickedText(e.target.innerText);
        getClickedText(e.target.innerText);
        setClickedPositionY(e.target.getBoundingClientRect().top + window.scrollY);
    };

  return (
    <nav className="flex justify-center items-center p-4 text-sm w-52">
      <ul className="relative px-4">
        {categories.content &&
          categories.content.map((category) => (
            <li
              key={category.id}
              className="cursor-pointer mb-4 relative z-20"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleMouseClick}
            >
              <Link to={`/products/category/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        {hoveredText && (clickedText !== hoveredText) && (
          <div
            className="bg-lightest-green min-w-full h-6 rounded-2xl absolute z-0"
            style={{ top: `${hoveredPositionY - 226}px`, left: "0" }}
          ></div>
        )}
        {clickedText && (
          <div
            className="bg-lighter-green min-w-full h-6 rounded-2xl absolute z-10"
            style={{ top: `${clickedPositionY - 227}px`, left: "0" }}
          ></div>
        )}
      </ul>
    </nav>
  );
};

export default SideNavigation;
