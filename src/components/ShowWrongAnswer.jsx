import { Volume2 } from "lucide-react";
import React, { useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../Question.json";

const AnswerDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    question,
    wrongAnswer,
    meaning,
    sentence,
    type,
    category,
    subType,
    id,
    isCorrect,
  } = location.state || {};

  const [correctAnswer, setCorrectAnswer] = useState(isCorrect || false);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleNextQuestion = () => {
    const filteredQuestions = questions.filter(
      (q) =>
        q.type?.toLowerCase() === type?.toLowerCase() &&
        q.category?.toLowerCase() === category?.toLowerCase() &&
        q.subType?.toLowerCase() === subType?.toLowerCase()
    );

    const currentQuestionIndex = filteredQuestions.findIndex(
      (q) => q.id === id
    );

    const nextQuestion = filteredQuestions[currentQuestionIndex + 1];

    if (nextQuestion) {
      navigate("/quiz", {
        state: {
          type: nextQuestion.type,
          category: nextQuestion.category,
          subType: nextQuestion.subType,
          startFromQuestionId: nextQuestion.id,
        },
      });
    } else {
      navigate("/quiz");
    }
  };

  if (!question) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-gray-600">No question details available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6  flex flex-col justify-center">
      <div className="bg-white dark:bg-[#2A2727] rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <h3 className="text-4xl font-bold text-[#2851a3] dark:text-[#ffffff] mb-4 text-center">
            {question}
          </h3>
        </div>

        <div>
          <p
            className={`text-3xl p-3 rounded-xl text-center font-bold ${"bg-[#F8B4B4] text-red-700"}`}
          >
            {wrongAnswer}
          </p>
        </div>
        {/* 
        <div className="relative bg-red-50 dark:bg-[#ffffff] rounded-lg shadow-lg flex flex-col min-h-[300px]">
            <div className="p-4 flex-grow mb-2 dark:bg-[#ffffff]"> */}

        {meaning && (
          <div className="relative bg-red-50  rounded-lg shadow-lg flex flex-col min-h-[300px]">
            <div className="p-4 flex-grow mb-2 ">
              <h4 className="text-xl font-semibold text-[#2851a3] dark:text-[#4b4b4b] mb-2">
                Meaning:
              </h4>
              <p className="text-3xl text-[#2851a3] dark:text-[#535353] font-semibold break-words">
                {meaning}
              </p>
            </div>
            {/* Conditional Icon: Green Checkmark or Red Cross */}
            <div
              className={`absolute bottom-4 right-4 pt-3 ${"text-red-600 dark:text-red-400"}`}
              style={{ fontSize: "36px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6 gap-x-6">
        <div className="w-14 h-14 bg-[#EE6C6A] dark:bg-[#2A2727] rounded-full flex items-center justify-center cursor-pointer">
          <Volume2
            onClick={() => speak(meaning)}
            className="w-10 h-10 text-white"
          />
        </div>

        <div
          onClick={handleNextQuestion}
          className="w-14 h-14 bg-[#EE6C6A] dark:bg-[#2A2727] rounded-full flex items-center justify-center cursor-pointer"
        >
          <FiChevronsRight className="text-white text-5xl" />
        </div>
      </div>
    </div>
  );
};

export default AnswerDetailPage;
