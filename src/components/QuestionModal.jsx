import React from "react";
import { FiChevronUp } from "react-icons/fi";
const QuestionModal = ({ isOpen, closeModal, question, meaning }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center h-[100vh] z-50">
      <div className="px-4 bg-[#DCE9FD] dark:bg-[#4A4B4A] p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl text-[#2851a3] dark:text-[#000000] font-bold md:text-4xl">
            {question}
          </h3>
          <button
            onClick={closeModal}
            className="p-1 rounded-full hover:bg-blue-200 transition hover:dark:bg-slate-500 ml-4"
          >
            <div className="w-14 h-14 bg-[#ffffff] dark:bg-[#2A2727] rounded-full flex items-center justify-center">
              <FiChevronUp className="text-[#2851a3] dark:text-[#ffffff] text-4xl" />
            </div>
          </button>
        </div>
        <div className="p-4 bg-white rounded-lg dark:bg-[#a6a6a6] mb-4">
          <p className="text-xl  font-bold text-[#2851a3] dark:text-[#ffffff] md:text-2xl lg:text-3xl">
            {meaning}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
