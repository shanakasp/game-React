import React, { useContext, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import questions from "../Question.json";
import { QuizContext } from "../QuizContext.js";

const CompletionScreen = ({ categoryPage }) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const { quizData } = useContext(QuizContext);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleDarkModeChange);

    return () =>
      darkModeQuery.removeEventListener("change", handleDarkModeChange);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle score loading and confetti timeout
  useEffect(() => {
    const quizScore = localStorage.getItem("quizScore");
    if (quizScore) {
      setScore(parseInt(quizScore, 10));
    }

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const getConfettiColors = () => {
    // Vibrant mixed colors for light mode
    const lightModeColors = [
      // Reds and Pinks
      "#FF0000", // Red
      "#FF1493", // Deep Pink
      "#FF69B4", // Hot Pink
      "#FF4500", // Orange Red
      "#DC143C", // Crimson

      // Oranges and Yellows
      "#FFA500", // Orange
      "#FFD700", // Gold
      "#FFFF00", // Yellow
      "#FFA07A", // Light Salmon
      "#FF8C00", // Dark Orange

      // Greens
      "#00FF00", // Lime
      "#32CD32", // Lime Green
      "#00FA9A", // Medium Spring Green
      "#98FB98", // Pale Green
      "#7FFF00", // Chartreuse

      // Blues and Cyans
      "#00FFFF", // Cyan
      "#00BFFF", // Deep Sky Blue
      "#1E90FF", // Dodger Blue
      "#4169E1", // Royal Blue
      "#0000FF", // Blue

      // Purples and Violets
      "#9400D3", // Dark Violet
      "#8A2BE2", // Blue Violet
      "#9370DB", // Medium Purple
      "#BA55D3", // Medium Orchid
      "#FF00FF", // Magenta
    ];

    // Neon and bright colors for dark mode
    const darkModeColors = [
      // Neon Reds and Pinks
      "#FF0080", // Neon Pink
      "#FF355E", // Neon Red
      "#FF1493", // Deep Pink
      "#FF00FF", // Magenta
      "#FF69B4", // Hot Pink

      // Neon Oranges and Yellows
      "#FFD700", // Gold
      "#FFA500", // Orange
      "#FFFF00", // Yellow
      "#FFB6C1", // Light Pink
      "#FF7F50", // Coral

      // Neon Greens
      "#39FF14", // Neon Green
      "#00FF00", // Lime
      "#7FFF00", // Chartreuse
      "#00FF7F", // Spring Green
      "#98FB98", // Pale Green

      // Neon Blues and Cyans
      "#00FFFF", // Cyan
      "#00BFFF", // Deep Sky Blue
      "#1E90FF", // Dodger Blue
      "#4169E1", // Royal Blue
      "#40E0D0", // Turquoise

      // Neon Purples and Special Colors
      "#8A2BE2", // Blue Violet
      "#9370DB", // Medium Purple
      "#EE82EE", // Violet
      "#F0E68C", // Khaki
      "#DDA0DD", // Plum
    ];

    return isDarkMode ? darkModeColors : lightModeColors;
  };

  const filteredQuestions = questions.filter(
    (question) =>
      question.type === quizData.type &&
      question.category === quizData.category &&
      question.subType === quizData.subType
  );

  const handleNavigate = (path) => {
    localStorage.removeItem("quizScore");
    localStorage.removeItem("quizAttempts");
    navigate(path);
  };

  return (
    <div className="min-h-screen w-full p-4 flex flex-col items-center relative">
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={true}
          numberOfPieces={250}
          gravity={0.15}
          colors={getConfettiColors()}
          tweenDuration={5000}
          opacity={isDarkMode ? 0.9 : 0.7}
          drawShape={(ctx) => {
            const shapes = [
              // Star shape
              (ctx) => {
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                  ctx.lineTo(
                    Math.cos(((18 + i * 72) * Math.PI) / 180) * 5,
                    Math.sin(((18 + i * 72) * Math.PI) / 180) * 5
                  );
                  ctx.lineTo(
                    Math.cos(((54 + i * 72) * Math.PI) / 180) * 10,
                    Math.sin(((54 + i * 72) * Math.PI) / 180) * 10
                  );
                }
                ctx.closePath();
                ctx.fill();
              },
              // Heart shape
              (ctx) => {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
                ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
                ctx.fill();
              },
              // Circle shape
              (ctx) => {
                ctx.beginPath();
                ctx.arc(0, 0, 5, 0, Math.PI * 2);
                ctx.fill();
              },
            ];

            // Randomly select a shape
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            shape(ctx);
          }}
        />
      )}

      {/* Rest of the component remains the same */}
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#2851a3] dark:text-violet-400 animate-bounce">
            🎉 Congratulations! 🎉
          </h1>
          <p className="text-lg sm:text-2xl text-[#2851a3] dark:text-violet-200 font-semibold">
            You completed the challenge:
          </p>
          <div className="inline-block text-3xl sm:text-6xl font-extrabold bg-white dark:bg-gray-800 text-[#2851a3] dark:text-violet-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg animate-pulse">
            {score}/10
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleNavigate(categoryPage || "/categories")}
            className="px-3 py-2 bg-[#2851a3] dark:bg-[#aeafaf] dark:hover:bg-violet-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:bg-blue-400 hover:scale-105 transition-transform"
          >
            Back to Categories
          </button>
          <button
            onClick={() => handleNavigate("/")}
            className="px-6 py-2 bg-[#2851a3] dark:bg-[#aeafaf] dark:hover:bg-violet-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:bg-blue-400 hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
        </div>

        {/* Q&A Layout (same as before) */}
        <div className="w-full bg-white/10 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="flex flex-col-2 lg:flex-row">
            {/* Questions Column */}
            <div className="w-full lg:w-1/2 p-4 border-b lg:border-b-0 lg:border-r border-gray-300 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-bold text-[#2851a3] dark:text-violet-300 pb-2 border-b border-gray-300 dark:border-gray-400">
                Questions
              </h2>
              <div className="space-y-3 mt-4">
                {filteredQuestions.slice(0, 10).map((question, index) => (
                  <div
                    key={`q-${question.id}`}
                    className="p-3 bg-[#c6d9ff] dark:bg-gray-500/30 rounded-lg"
                  >
                    <span className="text-sm sm:text-base">
                      <span className="font-semibold text-[#2851a3] dark:text-violet-300">
                        {index + 1}.{" "}
                      </span>
                      <span className="text-[#2851a3] dark:text-gray-200">
                        {question.question}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Answers Column */}
            <div className="w-full lg:w-1/2 p-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#2851a3] dark:text-violet-300 pb-2 border-b border-gray-300 dark:border-gray-400">
                Answers
              </h2>
              <div className="space-y-3 mt-4">
                {filteredQuestions.slice(0, 10).map((question, index) => (
                  <div
                    key={`a-${question.id}`}
                    className="p-3 bg-[#c6d9ff] dark:bg-gray-500/30 rounded-lg"
                  >
                    <span className="text-sm sm:text-base text-[#2851a3] dark:text-gray-200">
                      {question.answer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
