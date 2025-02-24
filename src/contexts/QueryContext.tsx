import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import { mockData } from "../utils/data";
import { SortConfig } from "../types";
import { simulateQueryExecution } from "../utils/simulateQuery";

interface QueryHistory {
  id: number;
  text: string;
  timestamp: number;
  executionTime?: number;
}

interface QueryContextValue {
  selectedQuery: (typeof mockData)[0];
  isLoading: boolean;
  progress: number;
  currentPage: number;
  sortConfig: SortConfig;
  queryHistory: QueryHistory[];
  clearHistory: () => void;
  setSelectedQuery: (query: (typeof mockData)[0]) => void;
  setCurrentPage: (page: number) => void;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
}

const QueryContext = createContext<QueryContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  QUERY_ID: "sql_viewer_query_id",
  SORT_CONFIG: "sql_viewer_sort_config",
  CURRENT_PAGE: "sql_viewer_current_page",
  QUERY_HISTORY: "sql_viewer_query_history",
};

export const QueryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Persistent state
  const [selectedQuery, setSelectedQuery] = usePersistentState(
    STORAGE_KEYS.QUERY_ID,
    mockData[0],
    (id: string) => mockData.find((q) => q.id === parseInt(id)) || mockData[0]
  );
  const [currentPage, setCurrentPage] = usePersistentState(
    STORAGE_KEYS.CURRENT_PAGE,
    1
  );
  const [sortConfig, setSortConfig] = usePersistentState<SortConfig>(
    STORAGE_KEYS.SORT_CONFIG,
    null
  );
  const [queryHistory, setQueryHistory] = usePersistentState<QueryHistory[]>(
    STORAGE_KEYS.QUERY_HISTORY,
    []
  );

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle query execution simulation
  useEffect(() => {
    if (!selectedQuery) return;
    
    const startTime = Date.now();
    setIsLoading(true);
    setProgress(0);
    
    const cleanup = simulateQueryExecution(
      selectedQuery,
      (newProgress) => {
        setProgress(Math.min(newProgress, 99));
      },
      () => {
        setProgress(100);
        const executionTime = Date.now() - startTime;
        
        // Add to history
        setQueryHistory(prev => {
          const newHistory = [{
            id: selectedQuery.id,
            text: selectedQuery.text,
            timestamp: Date.now(),
            executionTime
          }, ...prev].slice(0, 10); // Keep last 10 queries
          
          return newHistory;
        });

        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 500);
      }
    );

    return cleanup;
  }, [selectedQuery]);

  const clearHistory = () => {
    setQueryHistory([]);
  };

  const contextValue: QueryContextValue = {
    selectedQuery,
    isLoading,
    progress,
    currentPage,
    sortConfig,
    queryHistory,
    clearHistory,
    setSelectedQuery,
    setCurrentPage,
    setSortConfig,
  };

  return (
    <QueryContext.Provider value={contextValue}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQuery must be used within a QueryProvider");
  }
  return context;
};
