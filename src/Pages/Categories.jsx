import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../QuizContext";
import "./styles/Categories.css";

const Categories = () => {
  const { updateQuizData } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleCategorySelection = (category) => {
    updateQuizData("category", category);
    navigate("/type");
  };

  return (
    <div className="flex justify-center items-center px-4 bg-[#DCE9FD] dark:bg-[#4A4B4A]">
      <div className="categories-container">
        <div className="categories-buttons">
          <div className="categories-buttons flex flex-wrap gap-2 xl:gap-8 justify-center">
            <button
              className="categories-button text-xl"
              onClick={() => handleCategorySelection("Beginner")}
            >
              Beginner
            </button>
            <button
              className="categories-button text-xl"
              onClick={() => handleCategorySelection("Intermediate")}
            >
              Intermediate
            </button>
            <button
              className="categories-button text-xl"
              onClick={() => handleCategorySelection("Advanced")}
            >
              Advanced
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
