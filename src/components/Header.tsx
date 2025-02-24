import React from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { FaMoon, FaSun } from "react-icons/fa";

export const Header: React.FC = React.memo(() => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <header className="flex justify-between items-center mb-8 px-8 py-6 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-extrabold text-white tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 dark:from-white dark:to-gray-300">
          SQL Query Viewer
        </span>
      </h1>
      <button
        onClick={toggleDarkMode}
        className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-sm dark:bg-gray-800/50 text-white dark:text-yellow-200 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 dark:hover:bg-gray-800/70"
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? (
          <FaSun className="text-xl" />
        ) : (
          <FaMoon className="text-xl" />
        )}
        <span className="font-semibold">{isDarkMode ? "Light" : "Dark"}</span>
      </button>
    </header>
  );
});
