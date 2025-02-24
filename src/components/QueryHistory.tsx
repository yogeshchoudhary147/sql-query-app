import React from 'react';
import { useQuery } from '../contexts/QueryContext';
import { formatDistanceToNow } from 'date-fns';
import { mockData } from '../utils/data';

export const QueryHistory: React.FC = () => {
  const { queryHistory, clearHistory, setSelectedQuery, selectedQuery } = useQuery();

  const handleQuerySelect = (queryId: number, queryText: string) => {
    // Find the full query data from mockData
    const fullQuery = mockData.find(q => q.id === queryId);
    if (fullQuery) {
      setSelectedQuery(fullQuery);
    }
  };

  if (queryHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Query History</h2>
        <button
          onClick={clearHistory}
          className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear History
        </button>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {queryHistory.map((query) => (
          <div
            key={`${query.id}-${query.timestamp}`}
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
              selectedQuery.id === query.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
            }`}
            onClick={() => handleQuerySelect(query.id, query.text)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400 truncate flex-1 mr-4">
                {query.text}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                {formatDistanceToNow(query.timestamp, { addSuffix: true })}
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Execution time: {(query.executionTime! / 1000).toFixed(2)}s
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
