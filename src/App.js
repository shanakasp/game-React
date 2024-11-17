import React from "react";
import ExampleComponent from "./Pages/LandingPage.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#DCE9FD] dark:bg-[#4A4B4A]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-4">
        <ExampleComponent />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
