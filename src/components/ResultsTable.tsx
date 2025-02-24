import React, { useState, useEffect } from "react";
import { SortConfig } from "../types";
import { PaginationControls } from "./PaginationControls";
import { FaFileExport, FaSearch } from "react-icons/fa";
import { usePersistentState } from "../hooks/usePersistentState";
import { useDebounce } from "../hooks/useDebounce";

interface ResultsTableProps {
  data: Record<string, string | number>[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onExport: () => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  data,
  sortConfig,
  onSort,
  currentPage,
  onPageChange,
  itemsPerPage,
  onExport,
}) => {
  // Use persistent state for search
  const [searchTerm, setSearchTerm] = usePersistentState<string>(
    "sql_viewer_search",
    ""
  );
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter data based on search term
  const filterData = (data: Record<string, string | number>[]) => {
    if (!debouncedSearch) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  };

  // Reset to first page when search changes
  useEffect(() => {
    onPageChange(1);
  }, [debouncedSearch]);

  const sortData = (data: Record<string, string | number>[]) => {
    if (!sortConfig) return data;
    const sorted = [...data];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      const aStr = String(aValue);
      const bStr = String(bValue);
      return sortConfig.direction === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
    return sorted;
  };

  const filteredData = filterData(data);
  const sortedData = sortData(filteredData);
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 italic animate-fade-in">
            State persists across sessions
          </span>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <FaFileExport />
            Export CSV
          </button>
        </div>

        {/* Updated Search Bar with Clear Button */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search in results..."
            className="w-full pl-10 pr-12 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm px-3 py-1 
                bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
                text-gray-500 dark:text-gray-300 rounded-full 
                transition-all duration-200 hover:scale-105"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {totalItems} results
          {debouncedSearch && ` for "${debouncedSearch}"`}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className="border-b border-gray-200 dark:border-gray-700 p-3 text-left font-semibold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => onSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).split(/(?=[A-Z])/).join(" ")}
                  {sortConfig?.key === key && (
                    <span className="ml-2 inline-block transform transition-transform duration-200">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                {Object.values(row).map((value, i) => (
                  <td key={i} className="p-3 text-gray-800 dark:text-gray-200">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
