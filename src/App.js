import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Categories from "./Pages/Categories.jsx";
import ExampleComponent from "./Pages/LandingPage.jsx";
import Type from "./Pages/Type.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#DCE9FD] dark:bg-[#4A4B4A]">
      <Router>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            {/* Define your routes */}
            <Route path="/" element={<ExampleComponent />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/types" element={<Type />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </Router>
    </div>
  );
};

export default App;
