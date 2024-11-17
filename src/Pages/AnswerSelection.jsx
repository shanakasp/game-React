import { ChevronRight, Volume2 } from "lucide-react";
import React, { useContext, useState } from "react";
import questions from "../Question.json";
import { QuizContext } from "../QuizContext";

const AnswerSelection = () => {
  const { quizData } = useContext(QuizContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showSentence, setShowSentence] = useState(false);
  const [showError, setShowError] = useState(false);

  const speak = (text) => {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === filteredQuestions[currentIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
      setShowSentence(true);
      setShowError(false);
    } else {
      setShowError(true);
      // Reset after showing error message
      setTimeout(() => {
        setShowError(false);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === filteredQuestions[currentIndex].answer) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowSentence(false);
      setShowError(false);
    }
  };

  if (!quizData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading quiz data...</div>
      </div>
    );
  }

  const filteredQuestions = questions.filter(
    (q) =>
      q.type?.toLowerCase() === quizData.type?.toLowerCase() &&
      q.category?.toLowerCase() === quizData.category?.toLowerCase() &&
      q.subType?.toLowerCase() === quizData.subType?.toLowerCase()
  );

  if (filteredQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">
          No questions match the selected criteria.
        </div>
      </div>
    );
  }

  if (currentIndex >= filteredQuestions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-2xl font-semibold text-gray-800">
          Quiz Complete!
        </div>
        <div className="text-xl text-gray-700">Your Score: {score}/10</div>
      </div>
    );
  }

  const question = filteredQuestions[currentIndex];
  const isAnswerCorrect = selectedAnswer === question.answer;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {showError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-lg">
          Your answer is wrong
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {question.question}
        </h3>

        <div className="space-y-2">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null && !showError}
              className={`w-full py-3 px-4 rounded-lg text-left transition-all duration-200 
                bg-white
                ${
                  selectedAnswer === option
                    ? option === question.answer
                      ? "bg-green-100 ring-2 ring-green-500"
                      : "bg-red-100 ring-2 ring-red-500"
                    : "hover:bg-green-50"
                }
                ${
                  selectedAnswer === null
                    ? "hover:transform hover:-translate-y-0.5"
                    : ""
                }`}
            >
              <span className="text-gray-700">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {showSentence && isAnswerCorrect && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">{question.sentence}</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        {showSentence && (
          <button
            onClick={() => speak(question.sentence)}
            className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
          >
            <Volume2 className="w-5 h-5 text-red-600" />
          </button>
        )}

        {isAnswerCorrect && (
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-blue-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnswerSelection;
