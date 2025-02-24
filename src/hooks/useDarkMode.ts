import { useEffect, useCallback } from "react";
import { usePersistentState } from "./usePersistentState";

const STORAGE_KEYS = {
  DARK_MODE: "sql_viewer_dark_mode",
};

export const useDarkMode = (): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = usePersistentState(
    STORAGE_KEYS.DARK_MODE,
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    (value: string) => Boolean(value)
  );

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, [setIsDarkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setIsDarkMode]);

  return [isDarkMode, toggleDarkMode];
};
