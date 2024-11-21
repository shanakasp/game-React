import { Volume2 } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../Question.json";

const AnswerDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { question, answer, sentence, meaning, type, category, subType, id } =
    location.state || {};

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  const handleNextQuestion = () => {
    // Filter questions matching the current question's type, category, and subType
    const filteredQuestions = questions.filter(
      (q) =>
        q.type?.toLowerCase() === type?.toLowerCase() &&
        q.category?.toLowerCase() === category?.toLowerCase() &&
        q.subType?.toLowerCase() === subType?.toLowerCase()
    );

    // Find the index of the current question in the filtered array
    const currentQuestionIndex = filteredQuestions.findIndex(
      (q) => q.id === id
    );

    // Get the next question
    const nextQuestion = filteredQuestions[currentQuestionIndex + 1];

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
      // If no more questions, navigate back to quiz or show a message
      navigate("/quiz");
    }
  };

  if (!question) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">No question details available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col justify-center">
      <div className="bg-white dark:bg-[#2A2727] rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <h3 className="text-4xl font-semibold text-[#2851a3] dark:text-[#ffffff] mb-4 text-center">
            Question
          </h3>
          <p className="text-2xl text-center text-gray-800 dark:text-gray-200">
            {question}
          </p>
        </div>

        <div>
          <h3 className="text-4xl font-semibold text-[#2851a3] dark:text-[#ffffff] mb-4 text-center">
            Correct Answer
          </h3>
          <p className="text-2xl text-center text-green-700 dark:text-green-400 font-bold">
            {answer}
          </p>
        </div>

        {meaning && (
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xl text-blue-800 dark:text-blue-200">
                {meaning}
              </span>
              <button
                onClick={() => speak(meaning)}
                className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 transition"
              >
                <Volume2 className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </button>
            </div>
          </div>
        )}

        {sentence && (
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h4 className="text-2xl font-semibold text-[#2851a3] dark:text-[#ffffff] mb-2">
              Example Sentence
            </h4>
            <p className="text-xl text-gray-800 dark:text-gray-200">
              {sentence}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-[#2851a3] text-white rounded-lg hover:bg-[#163e6e] transition-all text-xl"
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerDetailPage;
