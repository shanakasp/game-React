import React from "react";
import BusImage from "../images/bus.png"; // Replace with the actual path to your bus image
import CircleImage from "../images/london.png"; // Replace with the actual path to your circle image

const LandingPage = () => {
  return (
    <div className="text-center bg-[#DCE9FD] dark:bg-[#4A4B4A]  ">
      {/* Bus Image */}
      <div className="relative">
        <img src={BusImage} alt="Bus" className="mx-auto h-32" />
        <button className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 text-3xl font-bold px-5 py-0.5 bg-[#3662C1] text-white rounded-3xl hover:bg-blue-600">
          Antonyms
        </button>
      </div>

      {/* Circle Image */}
      <div className="relative pt-[3%]">
        <img src={CircleImage} alt="Circle" className="mx-auto h-32" />
        <button className="absolute  -bottom-1.5 left-1/2 transform -translate-x-1/2 text-3xl font-bold px-5 py-0.5 bg-[#3662C1] text-white rounded-3xl hover:bg-blue-600">
          Synonyms
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
