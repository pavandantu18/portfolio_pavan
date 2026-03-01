import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
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

const GROUPS = [
  { id: 'spiderman', label: 'Spider-Man' },
  { id: 'pokemon',   label: 'Pokémon' },
  { id: 'ben10',     label: 'Ben 10' },
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

  // Clamp to viewport BEFORE first paint — no flicker
  useLayoutEffect(() => {
    const el = menuRef.current
    if (!el) return
    const pad = 10
    const cX = Math.max(pad, Math.min(x, window.innerWidth  - el.offsetWidth  - pad))
    const cY = Math.max(pad, Math.min(y, window.innerHeight - el.offsetHeight - pad))
    el.style.left = cX + 'px'
    el.style.top  = cY + 'px'
  }, [x, y])

  const handleItem = (item) => {
    item.action(setwindowState)
    onClose()
  }

  return (
    <div
      className="ctx-menu"
      style={{ left: x, top: y }}   /* corrected by useLayoutEffect before paint */
      ref={menuRef}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="ctx-menu__header">
        <span className="ctx-menu__spider">🕷</span>
        <span>Desktop</span>
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

        {GROUPS.map((grp) => {
          const grpThemes = Object.values(themes).filter(t => t.group === grp.id)
          if (!grpThemes.length) return null
          return (
            <div key={grp.id} className="ctx-menu__swatch-row">
              <span className="ctx-menu__swatch-row-label">{grp.label}</span>
              <div className="ctx-menu__swatches">
                {grpThemes.map((t) => (
                  <button
                    key={t.id}
                    className={`ctx-menu__swatch${themeId === t.id ? ' ctx-menu__swatch--active' : ''}`}
                    style={{ '--swatch-color': t.swatch }}
                    title={`${t.name} · ${t.subtitle}`}
                    onClick={() => setThemeId(t.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}

        <span className="ctx-menu__theme-name">
          {themes[themeId]?.name} &middot; <em>{themes[themeId]?.subtitle}</em>
        </span>
      </div>
    </div>
  )
}

export default ContextMenu
