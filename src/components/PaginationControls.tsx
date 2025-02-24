import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="flex justify-between items-center mt-6">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md disabled:bg-gray-300 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
    >
      <FaChevronLeft />
      Previous
    </button>
    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md disabled:bg-gray-300 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
    >
      Next
      <FaChevronRight />
    </button>
  </div>
);
