import { Volume2 } from "lucide-react";
import React from "react";
import { FiChevronsRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../Question.json";

const AnswerDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { question, answer, sentence, meaning, type, category, subType, id } =
    location.state || {};

  const quizAttempts = {
    1: 3,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 2,
  }; // Example of quizAttempts

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleNextQuestion = () => {
    // Check if the current question is the last one based on quizAttempts
    const currentQuestionIndex = Object.keys(quizAttempts).findIndex(
      (key) => parseInt(key) === id
    );

    if (currentQuestionIndex !== -1) {
      // Get the next question key
      const nextQuestionKey = parseInt(
        Object.keys(quizAttempts)[currentQuestionIndex + 1]
      );

      // If there's no next question, navigate to the completion page
      if (!nextQuestionKey) {
        navigate("/completion", {
          state: {
            score: quizAttempts[id] || 0, // Use the current score as the score for completion
            total: Object.keys(quizAttempts).length,
          },
        });
        return;
      }
    }

    // Filter questions matching the current question's type, category, and subType
    const filteredQuestions = questions.filter(
      (q) =>
        q.type?.toLowerCase() === type?.toLowerCase() &&
        q.category?.toLowerCase() === category?.toLowerCase() &&
        q.subType?.toLowerCase() === subType?.toLowerCase()
    );

    // Find the index of the current question in the filtered array
    const currentQuestionIndexInFiltered = filteredQuestions.findIndex(
      (q) => q.id === id
    );

    // Get the next question
    const nextQuestion = filteredQuestions[currentQuestionIndexInFiltered + 1];

    if (nextQuestion) {
      // Navigate back to AnswerSelection with the next question's context
      navigate("/quiz", {
        state: {
          type: nextQuestion.type,
          category: nextQuestion.category,
          subType: nextQuestion.subType,
          startFromQuestionId: nextQuestion.id, // Add this to track the starting point
        },
      });
    } else {
      // If no more questions, navigate to completion
      navigate("/completion", {
        state: {
          score: quizAttempts[id] || 0, // Use the current score as the score for completion
          total: Object.keys(quizAttempts).length,
        },
      });
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
          <p className="text-3xl p-3 rounded-xl text-center text-[#1c863c]  dark:text-green-700 font-bold bg-[#ABEE9B]">
            {answer}
          </p>
        </div>

        {sentence && (
          <div className="relative bg-green-50 dark:bg-[#AFAEAF] rounded-lg shadow-lg flex flex-col min-h-[300px]">
            <div className="p-4 flex-grow mb-2 dark:bg-[#AFAEAF]">
              <h4 className="text-xl font-semibold text-[#2851a3] dark:text-[#4b4b4b] mb-2">
                Example Sentence:
              </h4>
              <p className="text-3xl text-[#2851a3] dark:text-[#535353] font-semibold break-words">
                {sentence}
              </p>
            </div>
            {/* Green Checkmark */}
            <div
              className="absolute bottom-4 right-4 text-green-600 dark:text-green-300 pt-3"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6 gap-x-6">
        <div className="w-14 h-14 bg-[#EE6C6A] dark:bg-[#2A2727] rounded-full flex items-center justify-center cursor-pointer">
          <Volume2
            onClick={() => speak(sentence)}
            className="w-10 h-10 text-white"
          />
        </div>

        <div
          onClick={handleNextQuestion}
          className="w-14 h-14 bg-[#EE6C6A] dark:bg-[#2A2727] rounded-full flex items-center justify-center  cursor-pointer"
        >
          <FiChevronsRight className="text-white text-5xl" />
        </div>
      </div>
    </div>
  );
};

export default AnswerDetailPage;
