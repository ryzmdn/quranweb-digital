import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeContext, type ThemeContextType } from "@/context/ThemeContext";

const THEME_STORAGE_KEY = "currentTheme";
const DARK_CLASS = "dark";

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return (
      savedTheme === DARK_CLASS ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add(DARK_CLASS);
      localStorage.setItem(THEME_STORAGE_KEY, DARK_CLASS);
    } else {
      root.classList.remove(DARK_CLASS);
      localStorage.setItem(THEME_STORAGE_KEY, "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const value = useMemo<ThemeContextType>(
    () => ({ darkMode, toggleTheme }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
