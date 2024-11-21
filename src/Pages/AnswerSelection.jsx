import { Volume2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../Question.json";
import { QuizContext } from "../QuizContext";
import ProgressBar from "../components/ProgressBar";
import QuestionModal from "../components/QuestionModal";
import CompletionScreen from "./CompleteScreen";

const AnswerSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizData } = useContext(QuizContext);

  // Check if there's a starting question ID from navigation
  const { startFromQuestionId } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showSentence, setShowSentence] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [wrongAnswerMeaning, setWrongAnswerMeaning] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter questions based on quiz data and potential starting question
  const filteredQuestions = questions.filter((q) => {
    const matchesType =
      q.type?.toLowerCase() === quizData.type?.toLowerCase() &&
      q.category?.toLowerCase() === quizData.category?.toLowerCase() &&
      q.subType?.toLowerCase() === quizData.subType?.toLowerCase();

    // If startFromQuestionId is provided, start from that question
    if (startFromQuestionId) {
      return matchesType && q.id >= startFromQuestionId;
    }

    return matchesType;
  });

  // Update initial index if starting from a specific question
  useEffect(() => {
    if (startFromQuestionId) {
      const startIndex = filteredQuestions.findIndex(
        (q) => q.id === startFromQuestionId
      );
      setCurrentIndex(startIndex !== -1 ? startIndex : 0);
    }
  }, [startFromQuestionId, filteredQuestions]);

  useEffect(() => {
    setIsTimerRunning(true);
    const timer = setTimeout(() => {
      if (!selectedAnswer) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
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
    const currentQuestion = filteredQuestions[currentIndex];
    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      // Navigate to answer detail page with current question details
      navigate("/answer-detail", {
        state: {
          question: currentQuestion.question,
          answer: currentQuestion.answer,
          meaning: currentQuestion.questionMeaning,
          sentence: currentQuestion.sentence,
          type: currentQuestion.type,
          category: currentQuestion.category,
          subType: currentQuestion.subType,
          id: currentQuestion.id,
          isCorrect: true,
          currentIndex: currentIndex,
          nextIndex: currentIndex + 1,
          totalQuestions: filteredQuestions.length,
        },
      });

      // Increment score
      setScore((prevScore) => prevScore + 1);
    } else {
      const wrongMeaning = questions.find(
        (q) => q.answer === answer
      )?.answerMeaning;
      navigate("/show-wrong-answer", {
        state: {
          question: currentQuestion.question,
          wrongAnswer: answer,
          meaning: wrongMeaning,
          type: currentQuestion.type,
          category: currentQuestion.category,
          subType: currentQuestion.subType,
          id: currentQuestion.id,
          isCorrect: false,
        },
      });
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!quizData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading quiz data...</div>
      </div>
    );
  }

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
      <div className="mb-6">
        <div className="flex items-center justify-center mb-[7%]">
          <h3 className="text-5xl font-semibold text-[#2851a3] dark:text-[#ffffff] font-bold text-center">
            {question.question}
          </h3>

          <button
            onClick={openModal}
            className="p-1 rounded-full hover:bg-blue-200 transition hover:dark:bg-slate-500 ml-4"
          >
            <div className="w-14 h-14 bg-[#ffffff] dark:bg-[#2A2727] rounded-full flex items-center justify-center">
              <FiChevronDown className="text-[#2851a3] dark:text-[#ffffff] text-4xl" />
            </div>
          </button>
        </div>

        <ProgressBar isRunning={isTimerRunning} />

        <QuestionModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          question={question.question}
          meaning={question.questionMeaning}
        />

        <div className="space-y-4 mt-[15%]">
          {question.options.slice(0, 4).map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null && !showError}
              className={`w-full text-center text-2xl py-4 px-4 rounded-lg text-left transition-all duration-200 
        bg-white dark:bg-[#aeafaf]
        ${
          selectedAnswer === option
            ? option === question.answer
              ? " bg-[#ABEE9B]"
              : "bg-[#E4A5AF]"
            : "hover:bg-green-50"
        }
        ${
          selectedAnswer === null
            ? "hover:transform hover:-translate-y-0.5"
            : ""
        }`}
            >
              <span className="text-[#2851a3] dark:text-[#2A2727] font-bold py-2">
                {option}
              </span>
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
            onClick={handleNext}
            className="px-4 py-2 bg-[#2851a3] text-white rounded-lg hover:bg-[#163e6e] transition-all"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default AnswerSelection;
