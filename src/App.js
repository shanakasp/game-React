import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AnswerSelection from "./Pages/AnswerSelection.jsx";
import Categories from "./Pages/Categories.jsx";
import CompletionScreen from "./Pages/CompleteScreen.jsx";
import ExampleComponent from "./Pages/LandingPage.jsx";
import Type from "./Pages/Type.jsx";
import { QuizProvider } from "./QuizContext.js";
import AnswerDetailPage from "./components/AnswerDetailPage.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ShowWrongAnswer from "./components/ShowWrongAnswer.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#DCE9FD] dark:bg-[#4A4B4A]">
      <QuizProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ExampleComponent />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/type" element={<Type />} />
            <Route path="/quiz" element={<AnswerSelection />} />
            <Route path="/answer-detail" element={<AnswerDetailPage />} />
            <Route path="/completion" element={<CompletionScreen />} />
            <Route path="/show-wrong-answer" element={<ShowWrongAnswer />} />
          </Routes>
          <Footer />
        </Router>
      </QuizProvider>
    </div>
  );
};

export default App;
