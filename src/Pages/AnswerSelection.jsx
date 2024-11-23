import React, { useContext, useEffect, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../Question.json";
import { QuizContext } from "../QuizContext";
import ProgressBar from "../components/ProgressBar";
import QuestionModal from "../components/QuestionModal";

const AnswerSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizData } = useContext(QuizContext);

  const { startFromQuestionId } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
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

    if (startFromQuestionId) {
      return matchesType && q.id >= startFromQuestionId;
    }

    return matchesType;
  });

  // Memoize prepared options for each question
  const preparedQuestionsOptions = useMemo(() => {
    return filteredQuestions.map((question) => {
      const wrongOptions = question.options.filter(
        (opt) => opt !== question.answer
      );
      const shuffledWrongOptions = wrongOptions
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const finalOptions = [...shuffledWrongOptions];
      const randomIndex = Math.floor(Math.random() * 4);
      finalOptions.splice(randomIndex, 0, question.answer);

      return finalOptions;
    });
  }, [filteredQuestions]);

  // Track attempts in localStorage
  useEffect(() => {
    if (!localStorage.getItem("quizAttempts")) {
      localStorage.setItem("quizAttempts", JSON.stringify({}));
    }
  }, []);

  // Handle resetting the quiz score only on the first load of question 1
  useEffect(() => {
    if (filteredQuestions.length > 0 && filteredQuestions[0].id === 1) {
      const attempts = JSON.parse(localStorage.getItem("quizAttempts") || "{}");
      if (!attempts[1]) {
        localStorage.removeItem("quizScore");
      }
    }

    if (startFromQuestionId) {
      const startIndex = filteredQuestions.findIndex(
        (q) => q.id === startFromQuestionId
      );
      setCurrentIndex(startIndex !== -1 ? startIndex : 0);
    }
  }, [startFromQuestionId, filteredQuestions]);

  const handleAnswer = (answer) => {
    setIsTimerRunning(false);
    setSelectedAnswer(answer);
    const currentQuestion = filteredQuestions[currentIndex];
    const isCorrect = answer === currentQuestion.answer;

    // Get current score and attempts from localStorage
    const currentScore = parseInt(localStorage.getItem("quizScore") || "0");
    const attempts = JSON.parse(localStorage.getItem("quizAttempts") || "{}");

    // Initialize attempts for the current question if not present
    if (!attempts[currentQuestion.id]) {
      attempts[currentQuestion.id] = 0;
    }

    if (isCorrect) {
      // Increment score only for the first correct attempt
      if (attempts[currentQuestion.id] === 0) {
        const newScore = currentScore + 1;
        localStorage.setItem("quizScore", newScore.toString());
      }

      attempts[currentQuestion.id] += 1; // Mark as attempted

      localStorage.setItem("quizAttempts", JSON.stringify(attempts));

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
          score: currentScore + 1,
          totalQuestions: filteredQuestions.length,
        },
      });
    } else {
      // Deduct score only on the first wrong attempt
      if (attempts[currentQuestion.id] === 0) {
        const newScore = currentScore > 0 ? currentScore - 1 : -1;
        localStorage.setItem("quizScore", newScore.toString());
      }

      attempts[currentQuestion.id] += 1; // Mark as attempted

      localStorage.setItem("quizAttempts", JSON.stringify(attempts));

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
          currentIndex: currentIndex,
          score: currentScore > 0 ? currentScore - 1 : -1,
        },
      });
    }
  };

  // Open/Close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const question = filteredQuestions[currentIndex];
  const preparedOptions = preparedQuestionsOptions[currentIndex];

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
          {preparedOptions.map((option, idx) => (
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
    </div>
  );
};

export default AnswerSelection;
