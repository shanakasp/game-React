import React from "react";
import BusImage from "../images/bus.png";
import CircleImage from "../images/london.png";
import "./styles/LandingPage.css";
const LandingPage = () => {
  return (
    <div className="text-center bg-[#DCE9FD] dark:bg-[#4A4B4A]  ">
      <div className="landing-page-container">
        {/* Antonyms Section */}
        <div className="section-container">
          <img src={BusImage} alt="Bus" className="section-image" />
          <button className="section-button">Antonyms</button>
        </div>

        {/* Synonyms Section */}
        <div className="section-container">
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
