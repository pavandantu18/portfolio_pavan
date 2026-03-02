import { useContext } from 'react'
import { ThemeContext } from '../../../../context/ThemeContext'
import { THEME_LORE, WINDOW_SIZES } from '../../../../config/constants'
import MacWindow from '../../MacWindow'
import './ThemeExplorer.scss'

export default function ThemeExplorer({ windowName, setwindowState, zIndex, onFocus }) {
  const { themeId, setThemeId, themes, visitedThemes } = useContext(ThemeContext)

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus} {...WINDOW_SIZES.THEME_EXPLORER}>
      <div className="te-window">
        <div className="te-header">
          <span className="te-header__icon">🕷</span>
          <div>
            <p className="te-header__title">Universe Explorer</p>
            <p className="te-header__sub">Activate all universes to unlock an achievement</p>
          </div>
          <div className="te-header__progress">
            {Object.keys(themes).map(id => (
              <span
                key={id}
                className={`te-dot ${visitedThemes.has(id) ? 'te-dot--done' : ''}`}
                style={{ '--tc': themes[id].swatch }}
              />
            ))}
          </div>
        </div>

        <div className="te-grid">
          {Object.values(themes).map((t) => {
            const lore = THEME_LORE[t.id]
            const active = themeId === t.id
            const visited = visitedThemes.has(t.id)
            return (
              <button
                key={t.id}
                className={`te-card ${active ? 'te-card--active' : ''} ${visited && !active ? 'te-card--visited' : ''}`}
                style={{ '--tc': t.swatch }}
                onClick={() => setThemeId(t.id)}
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
