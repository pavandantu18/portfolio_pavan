import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AchievementProvider } from './context/AchievementContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { THEMES, DEFAULT_THEME_ID, THEME_STORAGE_KEY, applyTheme } from './config/themes.js'

// Apply saved theme before first paint — avoids flash of wrong theme
const savedId = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_ID;
applyTheme(THEMES[savedId] ?? THEMES[DEFAULT_THEME_ID]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AchievementProvider>
        <App />
      </AchievementProvider>
    </ThemeProvider>
  </StrictMode>
)
