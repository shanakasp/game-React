import { Volume2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../Question.json";
import { QuizContext } from "../QuizContext";
import ProgressBar from "../components/ProgressBar";
import CompletionScreen from "./CompleteScreen";

const AnswerSelection = () => {
  const navigate = useNavigate();
  const { quizData } = useContext(QuizContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showSentence, setShowSentence] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [wrongAnswerMeaning, setWrongAnswerMeaning] = useState(null);

  useEffect(() => {
    setIsTimerRunning(true);
    const timer = setTimeout(() => {
      if (!selectedAnswer) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          setCurrentIndex((prev) => prev + 1);
          setIsTimerRunning(true);
        }, 1500);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex, selectedAnswer]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answer) => {
    setIsTimerRunning(false);
    setSelectedAnswer(answer);
    const isCorrect = answer === filteredQuestions[currentIndex].answer;

    if (isCorrect) {
      setScore(score + 1);
      setShowSentence(true);
      setShowError(false);
    } else {
      setWrongAnswerMeaning(
        questions.find((q) => q.answer === answer)?.answerMeaning
      );
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowSentence(false);
      setWrongAnswerMeaning(null);
      setShowError(false);
      setIsTimerRunning(true);
    }
  };

  if (!quizData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading quiz data...</div>
      </div>
    );
  }
  console.log("quizData:", quizData);
  console.log("Questions loaded:", questions);

  const filteredQuestions = questions.filter((q) => {
    console.log("Checking question:", q);
    return (
      q.type?.toLowerCase() === quizData.type?.toLowerCase() &&
      q.category?.toLowerCase() === quizData.category?.toLowerCase() &&
      q.subType?.toLowerCase() === quizData.subType?.toLowerCase()
    );
  });

  console.log("Filtered Questions:", filteredQuestions);

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
      <ProgressBar isRunning={isTimerRunning} />

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {question.question}
        </h3>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <span>{question.questionMeaning}</span>
          <button
            onClick={() => speak(question.questionMeaning)}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
          >
            <Volume2 className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        <div className="space-y-2">
          {question.options.slice(0, 4).map((option, idx) => (
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

      {showError && wrongAnswerMeaning && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg shadow-sm flex items-center justify-between">
          <span className="text-red-700">{wrongAnswerMeaning}</span>
          <button
            onClick={() => speak(wrongAnswerMeaning)}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
          >
            <Volume2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      )}

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

        {(isAnswerCorrect || selectedAnswer) && (
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AnswerSelection;
