import React from "react";
import ExampleComponent from "./Pages/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div className="bg-[#DCE9FD] dark:bg-[#4A4B4A] min-h-screen">
      <Navbar />
      <div className="p-4">
        <ExampleComponent />
      </div>
    </div>
  );
};

export default App;
