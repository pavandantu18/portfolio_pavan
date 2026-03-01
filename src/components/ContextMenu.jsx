import React, { useEffect, useRef, useContext } from 'react'
import { RiTerminalBoxFill, RiSpotifyFill, RiGameFill, RiMedalFill, RiGithubFill, RiLinksLine, RiMailFill } from '@remixicon/react'
import { SOCIAL_LINKS } from '../config/constants'
import { ThemeContext } from '../context/ThemeContext'
import './ContextMenu.scss'

const items = [
  { icon: RiTerminalBoxFill, label: 'Open Terminal', action: (set) => set(s => ({ ...s, cli: true })) },
  { icon: RiSpotifyFill,     label: 'Open Spotify',  action: (set) => set(s => ({ ...s, spotify: true })) },
  { icon: RiGameFill,        label: 'Games',         action: (set) => set(s => ({ ...s, games: true })) },
  { icon: RiMedalFill,       label: 'Achievements',  action: (set) => set(s => ({ ...s, achievement: true })) },
  { icon: RiMailFill,        label: 'Contact',       action: (set) => set(s => ({ ...s, contact: true })) },
  null,
  { icon: RiGithubFill,  label: 'GitHub',   action: () => window.open(SOCIAL_LINKS.github,   '_blank') },
  { icon: RiLinksLine,   label: 'LinkedIn', action: () => window.open(SOCIAL_LINKS.linkedin, '_blank') },
]

const ContextMenu = ({ x, y, onClose, setwindowState }) => {
  const menuRef = useRef(null)
  const { themeId, setThemeId, themes } = useContext(ThemeContext)

  useEffect(() => {
    const handleClick = () => onClose()
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const safeX = Math.min(x, window.innerWidth  - 220)
  const safeY = Math.min(y, window.innerHeight - 380)

  const handleItem = (item) => {
    item.action(setwindowState)
    onClose()
  }

  return (
    <div
      className="ctx-menu"
      style={{ left: safeX, top: safeY }}
      ref={menuRef}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="ctx-menu__header">
        <span className="ctx-menu__spider">🕷</span>
        <span>Spider-Man Desktop</span>
      </div>

      {items.map((item, i) =>
        item === null
          ? <div key={i} className="ctx-menu__divider" />
          : (
            <button key={i} className="ctx-menu__item" onClick={() => handleItem(item)}>
              <item.icon size={15} className="ctx-menu__icon" />
              <span>{item.label}</span>
            </button>
          )
      )}

      <div className="ctx-menu__divider" />

      <div className="ctx-menu__theme-section">
        <span className="ctx-menu__theme-label">🎨 Theme</span>
        <div className="ctx-menu__swatches">
          {Object.values(themes).map((t) => (
            <button
              key={t.id}
              className={`ctx-menu__swatch${themeId === t.id ? ' ctx-menu__swatch--active' : ''}`}
              style={{ '--swatch-color': t.swatch }}
              title={`${t.name} · ${t.subtitle}`}
              onClick={() => setThemeId(t.id)}
            />
          ))}
        </div>
        <span className="ctx-menu__theme-name">
          {themes[themeId]?.name} &middot; <em>{themes[themeId]?.subtitle}</em>
        </span>
      </div>
    </div>
  )
}

export default ContextMenu
