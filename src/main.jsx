import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AchievementProvider } from './context/AchievementContext.jsx'

createRoot(document.getElementById('root')).render(
    <AchievementProvider>
        <App />
    </AchievementProvider>

)
