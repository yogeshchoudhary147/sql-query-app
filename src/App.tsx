import React from "react";
import { Header } from "./components/Header";
import { QuerySelector } from "./components/QuerySelector";
import { QueryDisplay } from "./components/QueryDisplay";
import { ResultsTable } from "./components/ResultsTable";
import { QueryHistory } from "./components/QueryHistory";
import { DataVisualization } from "./components/DataVisualization";
import { useQuery } from "./contexts/QueryContext";
import { exportToCsv } from "./utils/exportToCsv";
import { mockData } from "./utils/data";
import { SortConfig } from "./types";

const ITEMS_PER_PAGE = 10;

const App: React.FC = () => {
  const {
    selectedQuery,
    isLoading,
    progress,
    currentPage,
    sortConfig,
    setSelectedQuery,
    setCurrentPage,
    setSortConfig,
  } = useQuery();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedQuery.text);
    alert("Query copied to clipboard!");
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = mockData.find((q) => q.id === parseInt(e.target.value));
    if (query) {
      setSelectedQuery(query);
      setCurrentPage(1);
      setSortConfig(null);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig((prev: SortConfig) => {
      if (prev && prev.key === key && prev.direction === "asc") {
        return { key, direction: "desc" as const };
      }
      return { key, direction: "asc" as const };
    });
    setCurrentPage(1);
  };

  const handleExport = () => {
    exportToCsv(selectedQuery.data, `query_${selectedQuery.id}_results.csv`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="flex flex-col md:flex-row gap-8">
          <section className="md:w-2/5">
            <div className="space-y-6">
              <QuerySelector
                queries={mockData}
                selectedQuery={selectedQuery}
                onQueryChange={handleQueryChange}
              />
              <QueryDisplay
                queryText={selectedQuery.text}
                onCopy={copyToClipboard}
              />
              <QueryHistory />
            </div>
          </section>
          <section className="md:w-3/5 animate-fade-in">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                <div className="w-full max-w-md">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Simulating query... {progress}% complete
                  </p>
                </div>
              </div>
            ) : (
              <>
                <DataVisualization query={selectedQuery} />
                <ResultsTable
                  data={selectedQuery.data}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onExport={handleExport}
                />
              </>
            )}
          </section>
        </main>
        <footer className="mt-10 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Built with React, TypeScript, and Tailwind CSS by Yogesh Chaudhary
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
