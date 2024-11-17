import React, { createContext, useState } from "react";

// Create Context
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState({
    type: null, // 'Synonyms' or 'Antonyms'
    category: null, // 'Beginner', 'Intermediate', 'Advanced'
    subType: null, // 'Nouns', 'Verbs', 'Adjectives'
  });

  const updateQuizData = (field, value) => {
    setQuizData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log("Quiz Data:", quizData);

  return (
    <QuizContext.Provider value={{ quizData, updateQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};
