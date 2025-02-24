import React from "react";
import { FaCopy } from "react-icons/fa";

interface QueryDisplayProps {
  queryText: string;
  onCopy: () => void;
}

export const QueryDisplay: React.FC<QueryDisplayProps> = ({
  queryText,
  onCopy,
}) => (
  <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg">
    <textarea
      value={queryText}
      readOnly
      rows={5}
      className="w-full p-3 font-mono text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={onCopy}
      className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
      aria-label="Copy query to clipboard"
    >
      <FaCopy className="text-lg" />
    </button>
  </div>
);
