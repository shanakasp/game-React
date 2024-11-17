import React, { useContext, useState } from "react";
import questions from "../Question.json";
import { QuizContext } from "../QuizContext";

const AnswerSelection = () => {
  const { quizData } = useContext(QuizContext);

  // Debug: Log quizData and questions
  console.log("Quiz Data:", quizData);
  console.log("Questions Data:", questions);

  const filteredQuestions = questions.filter(
    (q) =>
      q.type.toLowerCase() === quizData.type.toLowerCase() &&
      q.category.toLowerCase() === quizData.category.toLowerCase() &&
      q.subType.toLowerCase() === quizData.subType.toLowerCase()
  );

  // Debug: Log filtered questions
  console.log("Filtered Questions:", filteredQuestions);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer) => {
    if (answer === filteredQuestions[currentIndex].answer) {
      setScore(score + 1);
    }
    setCurrentIndex(currentIndex + 1);
  };

  if (filteredQuestions.length === 0) {
    return <div>No questions match the selected criteria.</div>;
  }

  if (currentIndex >= filteredQuestions.length) {
    return (
      <div>
        Your Score: {score}/{filteredQuestions.length}
      </div>
    );
  }

  const question = filteredQuestions[currentIndex];

  return (
    <div>
      <h3>{question.question}</h3>
      {question.options.map((option, idx) => (
        <button key={idx} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnswerSelection;
