import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../QuizContext";
import "./styles/Categories.css";

const Type = () => {
  const { updateQuizData } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleSubTypeSelection = (subType) => {
    updateQuizData("subType", subType);
    navigate("/quiz");
  };

  return (
    <div className="flex justify-center items-center px-4 bg-[#DCE9FD] dark:bg-[#4A4B4A]">
      <div className="categories-container">
        <div className="categories-buttons dark:bg-[##AEAFAF]">
          <button
            className="categories-button text-xl "
            onClick={() => handleSubTypeSelection("Nouns")}
          >
            Nouns
          </button>
          <button
            className="categories-button text-xl"
            onClick={() => handleSubTypeSelection("Verbs")}
          >
            Verbs
          </button>
          <button
            className="categories-button text-xl"
            onClick={() => handleSubTypeSelection("Adjectives")}
          >
            Adjectives
          </button>
        </div>
      </div>
    </div>
  );
};

export default Type;
