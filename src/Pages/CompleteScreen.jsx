import React from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";

const CompletionScreen = ({ score, categoryPage }) => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const handleNavigate = () => {
    navigate(categoryPage || "/categories");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Fireworks effect */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
      />

      {/* Completion message */}
      <h1 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h1>
      <p className="text-2xl mb-8">
        You completed the challenge with a score of:
      </p>
      <div className="text-6xl font-extrabold bg-white text-purple-700 px-8 py-4 rounded-lg shadow-lg">
        {score}
      </div>

      {/* Navigate to category page button */}
      <button
        onClick={handleNavigate}
        className="mt-8 px-6 py-3 bg-yellow-400 text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:scale-105 transition-transform"
      >
        Back to Categories
      </button>
    </div>
  );
};

export default CompletionScreen;
