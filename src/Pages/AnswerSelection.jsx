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
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(Date.now());
  useEffect(() => {
    if (isModalOpen) {
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true);
    }
  }, [isModalOpen]);

  // Filter questions based on quiz data and potential starting question
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesType =
        q.type?.toLowerCase() === quizData.type?.toLowerCase() &&
        q.category?.toLowerCase() === quizData.category?.toLowerCase() &&
        q.subType?.toLowerCase() === quizData.subType?.toLowerCase();

      if (startFromQuestionId) {
        return matchesType && q.id >= startFromQuestionId;
      }

      return matchesType;
    });
  }, [quizData, startFromQuestionId]);

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

  // Initialize attempts in localStorage
  useEffect(() => {
    if (!localStorage.getItem("quizAttempts")) {
      localStorage.setItem("quizAttempts", JSON.stringify({}));
    }
  }, []);

  // Initialize timer start time on component mount or question change
  useEffect(() => {
    setTimerStartTime(Date.now());
  }, [currentIndex]);

  // Reset the quiz score only on the first load of question 1
  useEffect(() => {
    if (filteredQuestions.length > 0 && filteredQuestions[0].id === 1) {
      const attempts = JSON.parse(localStorage.getItem("quizAttempts") || "{}");
      if (!attempts[1]) {
        localStorage.setItem("quizScore", "0");
      }
    }

    if (startFromQuestionId) {
      const startIndex = filteredQuestions.findIndex(
        (q) => q.id === startFromQuestionId
      );
      setCurrentIndex(startIndex !== -1 ? startIndex : 0);
    }
  }, [startFromQuestionId, filteredQuestions]);

  const handleTimeComplete = () => {
    const currentQuestion = filteredQuestions[currentIndex];
    const attempts = JSON.parse(localStorage.getItem("quizAttempts") || "{}");
    const currentScore = parseInt(localStorage.getItem("quizScore") || "0");

    const newScore = attempts[currentQuestion.id]
      ? currentScore
      : currentScore - 1;
    localStorage.setItem("quizScore", newScore.toString());

    attempts[currentQuestion.id] = 1;
    localStorage.setItem("quizAttempts", JSON.stringify(attempts));

    setIsTimerRunning(false);
    navigate("/show-wrong-answer", {
      state: {
        question: currentQuestion.question,
        wrongAnswer: "Time's up!",
        meaning: "No answer was provided within the time limit",
        type: currentQuestion.type,
        category: currentQuestion.category,
        subType: currentQuestion.subType,
        id: currentQuestion.id,
        isCorrect: false,
        currentIndex: currentIndex,
        score: newScore,
      },
    });
  };

  const handleAnswer = (answer) => {
    setIsTimerRunning(false);
    setSelectedAnswer(answer);
    const currentQuestion = filteredQuestions[currentIndex];
    const isCorrect = answer === currentQuestion.answer;

    const currentScore = parseInt(localStorage.getItem("quizScore") || "0");
    const attempts = JSON.parse(localStorage.getItem("quizAttempts") || "{}");

    if (isCorrect) {
      if (!attempts[currentQuestion.id]) {
        const newScore = currentScore + 1;
        localStorage.setItem("quizScore", newScore.toString());
      }

      attempts[currentQuestion.id] = attempts[currentQuestion.id]
        ? attempts[currentQuestion.id] + 1
        : 1;
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
          score: parseInt(localStorage.getItem("quizScore") || "0"),
          totalQuestions: filteredQuestions.length,
        },
      });
    } else {
      const newScore = attempts[currentQuestion.id]
        ? currentScore
        : currentScore - 1;
      localStorage.setItem("quizScore", newScore.toString());

      attempts[currentQuestion.id] = attempts[currentQuestion.id]
        ? attempts[currentQuestion.id] + 1
        : 1;
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
          score: newScore,
        },
      });
    }
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

  const question = filteredQuestions[currentIndex];
  const preparedOptions = preparedQuestionsOptions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-[7%]">
          <h3
            className={`${
              question.question.length > 9 ? "text-4xl" : "text-5xl"
            } font-semibold text-[#2851a3] dark:text-[#ffffff] font-bold text-center`}
          >
            {question.question}
          </h3>

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1 rounded-full hover:bg-blue-200 transition hover:dark:bg-slate-500 ml-4"
          >
            <div className="w-14 h-14 bg-[#ffffff] dark:bg-[#2A2727] rounded-full flex items-center justify-center">
              <FiChevronDown className="text-[#2851a3] dark:text-[#ffffff] text-4xl" />
            </div>
          </button>
        </div>

        <ProgressBar
          duration={10000}
          isRunning={isTimerRunning}
          onComplete={handleTimeComplete}
          startTime={timerStartTime}
          isPaused={isModalOpen}
        />

        <QuestionModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          question={question.question}
          meaning={question.questionMeaning}
        />

        <div className="space-y-4 mt-[15%]">
          {preparedOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`w-full text-center text-2xl py-4 px-4 rounded-lg text-left transition-all duration-200 
                bg-white dark:bg-[#aeafaf]
                ${
                  selectedAnswer === option
                    ? option === question.answer
                      ? "bg-[#ABEE9B]"
                      : "bg-[#E4A5AF]"
                    : "hover:bg-blue-50"
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
