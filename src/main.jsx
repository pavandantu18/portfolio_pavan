import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NotFound from './components/NotFound.jsx'
import { AchievementProvider } from './context/AchievementContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { THEMES, DEFAULT_THEME_ID, THEME_STORAGE_KEY, applyTheme } from './config/themes.js'

// Apply saved theme before first paint — avoids flash of wrong theme
const savedId = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_ID;
applyTheme(THEMES[savedId] ?? THEMES[DEFAULT_THEME_ID]);

// Any path other than "/" is a 404 — Vercel routes all paths to index.html
const isRoot = window.location.pathname === '/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AchievementProvider>
        {isRoot ? <App /> : <NotFound />}
      </AchievementProvider>
    </ThemeProvider>
  </StrictMode>
)
