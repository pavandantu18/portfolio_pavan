import { useContext } from 'react'
import { ThemeContext } from '../../../../context/ThemeContext'
import { AchievementContext } from '../../../../context/AchievementContext'
import { ACHIEVEMENTS, THEME_LORE } from '../../../../config/constants'
import MacWindow from '../../MacWindow'
import './ThemeExplorer.scss'

const VISITED_KEY = 'pavanThemesVisited'

function getVisited() {
  try { return new Set(JSON.parse(localStorage.getItem(VISITED_KEY) || '[]')) }
  catch { return new Set() }
}

function saveVisited(set) {
  localStorage.setItem(VISITED_KEY, JSON.stringify([...set]))
}

export default function ThemeExplorer({ windowName, setwindowState }) {
  const { themeId, setThemeId, themes } = useContext(ThemeContext)
  const { unlockAchievement } = useContext(AchievementContext)

  const handleActivate = (id) => {
    setThemeId(id)
    const visited = getVisited()
    visited.add(id)
    saveVisited(visited)
    if (visited.size >= Object.keys(themes).length) {
      unlockAchievement(ACHIEVEMENTS.SPIDER_VERSE)
    }
  }

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} initialWidth={800} initialHeight={390}>
      <div className="te-window">
        <div className="te-header">
          <span className="te-header__icon">🕷</span>
          <div>
            <p className="te-header__title">Spider-Verse Explorer</p>
            <p className="te-header__sub">Activate all 5 universes to unlock an achievement</p>
          </div>
          <div className="te-header__progress">
            {Object.keys(themes).map(id => (
              <span
                key={id}
                className={`te-dot ${getVisited().has(id) ? 'te-dot--done' : ''}`}
                style={{ '--tc': themes[id].swatch }}
              />
            ))}
          </div>
        </div>

        <div className="te-grid">
          {Object.values(themes).map((t) => {
            const lore = THEME_LORE[t.id]
            const active = themeId === t.id
            const visited = getVisited().has(t.id)
            return (
              <button
                key={t.id}
                className={`te-card ${active ? 'te-card--active' : ''} ${visited && !active ? 'te-card--visited' : ''}`}
                style={{ '--tc': t.swatch }}
                onClick={() => handleActivate(t.id)}
              >
                <div className="te-card__glow" />
                <div className="te-card__top">
                  <span className="te-card__spider">🕷</span>
                  {active && <span className="te-card__live">● LIVE</span>}
                  {visited && !active && <span className="te-card__check">✓</span>}
                </div>
                <div className="te-card__name">{t.name}</div>
                <div className="te-card__sub">{t.subtitle}</div>
                <div className="te-card__universe">{lore.universe}</div>
                <div className="te-card__power">{lore.power}</div>
                <div className="te-card__quote">"{lore.quote}"</div>
                <div className={`te-card__btn ${active ? 'te-card__btn--active' : ''}`}>
                  {active ? 'Active Universe' : 'Enter Universe'}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </MacWindow>
  )
}
