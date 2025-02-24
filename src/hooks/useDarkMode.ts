import { useEffect } from "react";
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return [isDarkMode, toggleDarkMode];
};
