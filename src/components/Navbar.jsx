import React from "react";
import { useTheme } from "../ThemContext";
import logo from "../images/logo.png";
import MoonIcon from "../images/moon.svg";
import SunIcon from "../images/sun.svg";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
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
          className="p-2 bg-white rounded-full flex justify-center items-center "
        >
          {theme === "light" ? (
            <img src={MoonIcon} alt="Dark Mode" className="h-6 w-6" />
          ) : (
            <img src={SunIcon} alt="Light Mode" className="h-6 w-6" />
          )}
        </button>

        {/* Question Icon */}

        <div className="rounded-full bg-white p-2 flex items-center justify-center w-10 h-10">
          <span className="text-blue-500 dark:text-gray-600 text-3xl font-semibold ">
            ?
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
