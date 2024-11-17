import React from "react";
import "./styles/Categories.css"; // Importing the external CSS file

const Categories = () => {
  return (
    <div className="flex justify-center items-center px-4 bg-[#DCE9FD] dark:bg-[#4A4B4A] ">
      <div className="categories-container">
        <div className="categories-buttons">
          <div className="categories-button-container">
            <button className="categories-button">Beginner</button>
            <button className="categories-button">Intermediate</button>
            <button className="categories-button">Advanced</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
