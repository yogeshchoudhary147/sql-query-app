import { useState, useEffect, useMemo } from "react";

export const usePersistentState = <T>(
  key: string,
  defaultValue: T,
  parser?: (value: string) => T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const initialValue = useMemo(() => {
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
  }, [key, defaultValue, parser]);

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const currentValue = localStorage.getItem(key);
      if (currentValue !== JSON.stringify(value)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};
