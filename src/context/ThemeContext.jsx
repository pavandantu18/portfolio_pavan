/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { THEMES, DEFAULT_THEME_ID, THEME_STORAGE_KEY, applyTheme } from "../config/themes";

export const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

const VISITED_KEY = 'pavanThemesVisited';

function loadVisited() {
  try { return new Set(JSON.parse(localStorage.getItem(VISITED_KEY) || '[]')) }
  catch { return new Set() }
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_ID;
  });

  const [visitedThemes, setVisitedThemes] = useState(loadVisited);

  useEffect(() => {
    const theme = THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID];
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, themeId);

    setVisitedThemes(prev => {
      if (prev.has(themeId)) return prev;
      const next = new Set(prev);
      next.add(themeId);
      localStorage.setItem(VISITED_KEY, JSON.stringify([...next]));
      return next;
    });
  }, [themeId]);

  const theme = THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID];

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, themes: THEMES, theme, visitedThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}
