import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemContext";
import logo from "../images/logo.png";
import MoonIcon from "../images/moon.svg";
import SunIcon from "../images/sun.svg";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goHome = () => {
    // localStorage.removeItem("quizScore");
    navigate("/");
  };

  // Animation Variants for the Modal
  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { duration: 0.5 } },
    exit: { y: "-100vh", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <nav className="relative bg-[#DCE9FD] dark:bg-[#4A4B4A] pb-[20%] lg:pb-[5%]">
        {/* Logo in the top-left corner */}
        <h1 className="absolute top-0 left-0 p-4">
          <img
            src={logo}
            alt="Light Mode"
            className="h-12 w-30 dark:brightness-0 dark:invert cursor-pointer"
            onClick={goHome}
          />
        </h1>

        {/* Buttons in the top-right corner */}
        <div className="absolute top-0 right-0 p-4 flex flex-col items-center space-y-3">
          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 bg-white rounded-full flex justify-center items-center"
          >
            {theme === "light" ? (
              <img src={MoonIcon} alt="Dark Mode" className="h-5 w-5" />
            ) : (
              <img src={SunIcon} alt="Light Mode" className="h-5 w-5" />
            )}
          </button>

          {/* Question Icon */}
          <button
            onClick={openModal}
            className="rounded-full bg-white p-1.5 flex items-center justify-center w-8 h-8"
          >
            <span className="text-blue-500 text-2xl font-semibold">?</span>
          </button>
        </div>
      </nav>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="relative bg-[#2851a3] dark:bg-[#4A4B4A] text-white dark:text-white p-12 rounded-3xl shadow-lg w-96 max-w-full"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={closeModal}
                className="absolute top-0 right-2 text-white dark:text-red-300 dark:hover:text-red-500 hover:text-red-400 text-5xl"
              >
                &times;
              </button>

              <ol className="list-decimal list-inside space-y-3 text-2xl font-semibold">
                <li>Inside phone settings change language to English</li>
                <li>Choose to work with Antonyms or Synonyms</li>
                <li>Choose the level and type of words</li>
                <li>You have 10 seconds to find the correct answer</li>
                <li>To listen, press the speaker</li>
                <li>To move on to the next one, press the arrow.</li>
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
