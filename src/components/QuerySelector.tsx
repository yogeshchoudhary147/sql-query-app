import React from "react";
import { Query } from "../types";

interface QuerySelectorProps {
  queries: Query[];
  selectedQuery: Query;
  onQueryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const QuerySelector: React.FC<QuerySelectorProps> = ({
  queries,
  selectedQuery,
  onQueryChange,
}) => (
  <div className="relative">
    <select
      onChange={onQueryChange}
      value={selectedQuery.id}
      className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-gray-900 dark:text-gray-100 
        hover:border-blue-400 dark:hover:border-blue-500
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        transition-all duration-200 appearance-none cursor-pointer"
    >
      {queries.map((query) => (
        <option
          key={query.id}
          value={query.id}
          className="py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          Query {query.id} - {query.text.slice(0, 30)}...
        </option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
      <svg 
        className="w-5 h-5 text-gray-500 dark:text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);
