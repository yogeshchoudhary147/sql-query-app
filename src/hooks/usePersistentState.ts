import { useState, useEffect } from "react";

export const usePersistentState = <T>(
  key: string,
  defaultValue: T,
  parser?: (value: string) => T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        return parser ? parser(parsed) : (parsed as T);
      }
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
