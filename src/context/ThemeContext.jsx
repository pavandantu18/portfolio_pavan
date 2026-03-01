/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { THEMES, DEFAULT_THEME_ID, THEME_STORAGE_KEY, applyTheme } from "../config/themes";

export const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_ID;
  });

  useEffect(() => {
    const theme = THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID];
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  }, [themeId]);

  const theme = THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID];

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, themes: THEMES, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
