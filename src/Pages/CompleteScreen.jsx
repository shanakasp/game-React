import React, { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import questions from "../Question.json";
import { QuizContext } from "../QuizContext.js";

const CompletionScreen = ({ categoryPage }) => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [score, setScore] = useState(0);
  const { quizData } = useContext(QuizContext);

  useEffect(() => {
    const quizScore = localStorage.getItem("quizScore");
    if (quizScore) {
      setScore(parseInt(quizScore, 10));
    }
  }, []);

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
    <div className="max-h-screen w-full p-2 sm:p-4 flex flex-col items-center">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
      />

      <div className="w-full max-w-7xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="text-center space-y-2 sm:space-y-4 mb-4">
          <h1 className="text-xl sm:text-3xl font-bold text-[#2851a3] dark:text-[#ffffff]">
            🎉 Congratulations! 🎉
          </h1>
          <p className="text-lg sm:text-2xl text-[#2851a3] dark:text-[#ffffff] font-semibold">
            You completed the challenge:
          </p>
          <div className="inline-block text-3xl sm:text-6xl font-extrabold bg-white text-[#2851a3] dark:text-[#8f8f8f] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg">
            {score}/10
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mt-4 sm:mt-8">
          <button
            onClick={() => handleNavigate(categoryPage || "/categories")}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#2851a3] dark:bg-[#aeafaf] dark:text-[#000000] text-[#ffffff] text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:bg-blue-400 hover:scale-105 transition-transform"
          >
            Back to Categories
          </button>
          <button
            onClick={() => handleNavigate("/")}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#2851a3] dark:bg-[#aeafaf] dark:text-[#000000] text-[#ffffff] text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:bg-blue-400 hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
        </div>

        {/* Fixed Two-Column Layout */}
        <div className="w-full bg-white/10 rounded-lg backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="flex flex-row divide-x divide-gray-300">
            {/* Questions Column */}
            <div className="w-1/2 p-2 sm:p-4">
              <h2 className="text-base sm:text-xl font-bold text-[#2851a3] dark:text-[#ffffff] pb-2 border-b border-gray-300">
                Questions
              </h2>
              <div className="space-y-2 sm:space-y-4 mt-2 sm:mt-4">
                {filteredQuestions.slice(0, 10).map((question, index) => (
                  <div
                    key={`q-${question.id}`}
                    className="p-2 sm:p-3 bg-white/5 rounded-lg"
                  >
                    <span className="text-sm sm:text-base">
                      <span className="font-semibold text-[#2851a3] dark:text-[#ffffff]">
                        {index + 1}.{" "}
                      </span>
                      <span className="text-[#2851a3] dark:text-[#ffffff]">
                        {question.question}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Answers Column */}
            <div className="w-1/2 p-2 sm:p-4">
              <h2 className="text-base sm:text-xl font-bold text-[#2851a3] dark:text-[#ffffff] pb-2 border-b border-gray-300">
                Answers
              </h2>
              <div className="space-y-2 sm:space-y-4 mt-2 sm:mt-4">
                {filteredQuestions.slice(0, 10).map((question, index) => (
                  <div
                    key={`a-${question.id}`}
                    className="p-2 sm:p-3 bg-white/5 rounded-lg"
                  >
                    <span className="text-sm sm:text-base text-[#2851a3] dark:text-[#ffffff]">
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
