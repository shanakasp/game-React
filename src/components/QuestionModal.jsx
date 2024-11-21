import React from "react";
import { FiChevronUp } from "react-icons/fi";

const QuestionModal = ({ isOpen, closeModal, question, meaning }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#2A2727] p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl text-[#2851a3] dark:text-[#ffffff] font-semibold">
            {question}
          </h3>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <FiChevronUp className="text-[#2851a3] dark:text-[#ffffff]" />
          </button>
        </div>
        <p className="text-lg text-gray-700 dark:text-white">{meaning}</p>
      </div>
    </div>
  );
};

export default QuestionModal;
