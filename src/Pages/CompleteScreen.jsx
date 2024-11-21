import React from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";

const CompletionScreen = ({ score, categoryPage }) => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const handleNavigate = (path) => {
    // Remove quizScore from localStorage
    localStorage.removeItem("quizScore");

    // Navigate to the specified path
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center   min-h-[400px] text-white">
      {/* Fireworks effect */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
      />

      {/* Completion message */}
      <h1 className="text-3xl font-bold mb-4  text-[#2851a3] dark:text-[#ffffff] font-bold text-center">
        🎉 Congratulations! 🎉
      </h1>
      <p className="text-2xl mb-8 text-[#2851a3] dark:text-[#ffffff] font-semibold">
        You completed the challenge:
      </p>
      <div className="text-6xl font-extrabold bg-white text-purple-700 px-8 py-4 rounded-lg shadow-lg">
        10/10
      </div>

      {/* Navigate to category page button */}
      <button
        onClick={() => handleNavigate(categoryPage || "/categories")}
        className="mt-8 px-6 py-3 bg-yellow-400 dark:bg-yellow-700 dark:text-[#ffffff] text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:scale-105 transition-transform"
      >
        Back to Categories
      </button>

      {/* Navigate to home page button */}
      <button
        onClick={() => handleNavigate("/")}
        className="mt-4 px-6 py-3 bg-green-400 dark:bg-green-700 dark:text-[#ffffff] text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-green-300 hover:scale-105 transition-transform"
      >
        Back to Home
      </button>
    </div>
  );
};

export default CompletionScreen;
