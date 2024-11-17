import { ChevronRight, Home, Volume2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../Question.json";
import { QuizContext } from "../QuizContext";

const Confetti = () => {
  // Simple CSS-based confetti animation
  const colors = [
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            width: "10px",
            height: "10px",
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

const CompletionScreen = ({ score, total }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <Confetti />
      <div className="text-4xl font-bold text-blue-600 mb-4">
        🎉 Congratulations! 🎉
      </div>
      <div className="text-2xl text-gray-700 mb-6">Your Score: {score}/10</div>
      <div className="text-lg text-gray-600 mb-8">
        You've completed all the questions!
      </div>
      <button
        onClick={() => navigate("/type")}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg
          hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
      >
        <Home className="w-5 h-5" />
        Back to Categories
      </button>
    </div>
  );
};

const AnswerSelection = () => {
  const navigate = useNavigate();
  const { quizData } = useContext(QuizContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showSentence, setShowSentence] = useState(false);
  const [showError, setShowError] = useState(false);

  const speak = (text) => {
    window.speechSynthesis.cancel();
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
    return <CompletionScreen score={score} total={filteredQuestions.length} />;
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

// Add the confetti animation styles to your CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes confetti-fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  
  .animate-confetti {
    position: absolute;
    animation: confetti-fall linear forwards;
  }
`;
document.head.appendChild(style);

export default AnswerSelection;
