import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../QuizContext";
import BusImage from "../images/bus.png";
import CircleImage from "../images/london.png";
import "./styles/LandingPage.css";

const LandingPage = () => {
  const { updateQuizData } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleTypeSelection = (type) => {
    updateQuizData("type", type);
    navigate("/categories");
  };

  return (
    <div className="text-center bg-[#DCE9FD] dark:bg-[#4A4B4A]">
      <div className="landing-page-container">
        <div
          className="section-container"
          onClick={() => handleTypeSelection("Synonyms")}
        >
          <img src={BusImage} alt="Bus" className="section-image" />
          <button className="section-button">Antonyms</button>
        </div>
        <div
          className="section-container"
          onClick={() => handleTypeSelection("Antonyms")}
        >
          <img
            src={CircleImage}
            alt="London Circle"
            className="section-image"
          />
          <button className="section-button">Synonyms</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
