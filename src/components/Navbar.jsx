import React, { useState } from "react";
import { useTheme } from "../ThemContext";
import logo from "../images/logo.png";
import MoonIcon from "../images/moon.svg";
import SunIcon from "../images/sun.svg";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <nav className="p-4 bg-[#DCE9FD] dark:bg-[#4A4B4A] flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-500 dark:text-white">
          <img
            src={logo}
            alt="Light Mode"
            className="h-12 w-30 dark:brightness-0 dark:invert"
          />
        </h1>
        <div className="flex items-center space-x-4">
          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-white rounded-full flex justify-center items-center"
          >
            {theme === "light" ? (
              <img src={MoonIcon} alt="Dark Mode" className="h-6 w-6" />
            ) : (
              <img src={SunIcon} alt="Light Mode" className="h-6 w-6" />
            )}
          </button>

          {/* Question Icon */}
          <button
            onClick={openModal}
            className="rounded-full bg-white p-2 flex items-center justify-center w-10 h-10"
          >
            <span className="text-blue-500 dark:text-gray-600 text-3xl font-semibold">
              ?
            </span>
          </button>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className={`relative bg-white dark:bg-[#4A4B4A] text-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-96 max-w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-0 right-2 text-red-600 dark:text-red-300 dark:hover:text-red-500 hover:text-red-400  text-5xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Dans les paramètres régler son téléphone en anglais</li>
              <li>Dans le menu choisir la thématique</li>
              <li>Appuyer sur play</li>
              <li>Vous avez 10 secondes pour trouver la réponse</li>
              <li>Le résultat s'affiche</li>
              <li>Pour écouter appuyer sur le haut-parleur</li>
              <li>Pour passer au suivant appuyer sur la flèche</li>
            </ol>
            {/* <button
              onClick={closeModal}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
