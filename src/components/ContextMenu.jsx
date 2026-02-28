import React, { useEffect, useRef } from 'react'
import { RiStickyNoteFill, RiTerminalBoxFill, RiSpotifyFill, RiGameFill, RiMedalFill, RiGithubFill, RiLinksLine } from '@remixicon/react'
import { SOCIAL_LINKS } from '../config/constants'
import './ContextMenu.scss'

const items = [
  { icon: RiTerminalBoxFill, label: 'Open Terminal',   action: (set) => set(s => ({ ...s, cli: true })) },
  { icon: RiStickyNoteFill,  label: 'Open Notes',      action: (set) => set(s => ({ ...s, note: true })) },
  { icon: RiSpotifyFill,     label: 'Open Spotify',    action: (set) => set(s => ({ ...s, spotify: true })) },
  { icon: RiGameFill,        label: 'Open Color Game',  action: (set) => set(s => ({ ...s, color: true })) },
  { icon: RiMedalFill,       label: 'Achievements',    action: (set) => set(s => ({ ...s, achievement: true })) },
  null, // divider
  { icon: RiGithubFill,      label: 'GitHub',          action: () => window.open(SOCIAL_LINKS.github, '_blank') },
  { icon: RiLinksLine,       label: 'LinkedIn',        action: () => window.open(SOCIAL_LINKS.linkedin, '_blank') },
]

const ContextMenu = ({ x, y, onClose, setwindowState }) => {
  const menuRef = useRef(null)

  // Close on outside click or Escape
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

  // Keep menu within viewport
  const safeX = Math.min(x, window.innerWidth  - 200)
  const safeY = Math.min(y, window.innerHeight - 300)

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
    </div>
  )
}

export default ContextMenu
