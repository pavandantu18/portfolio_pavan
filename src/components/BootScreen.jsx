import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SPIDER_CHARS } from '../config/spiderChars'
import './BootScreen.scss'

/* ── Component ──────────────────────────────────────────────────────────────── */
const BootScreen = ({ onDone }) => {
  const [phase, setPhase] = useState('enter')
  const { themeId } = useTheme()
  const char = SPIDER_CHARS[themeId] ?? SPIDER_CHARS.classic

  useEffect(() => {
    const idle = setTimeout(() => setPhase('exit'), 2800)
    return () => clearTimeout(idle)
  }, [])

  useEffect(() => {
    if (phase !== 'exit') return
    const done = setTimeout(onDone, 600)
    return () => clearTimeout(done)
  }, [phase, onDone])

  return (
    <div className={`boot-screen boot-screen--${phase}`} onClick={() => setPhase('exit')}>
      <svg className="boot-web" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          return (
            <line key={i}
              x1="200" y1="200"
              x2={200 + Math.cos(angle) * 200}
              y2={200 + Math.sin(angle) * 200}
              stroke="var(--t-primary)" strokeWidth="1" opacity="0.4"
            />
          )
        })}
        {[30, 65, 105, 150, 200].map((r, i) => (
          <circle key={i} cx="200" cy="200" r={r}
            fill="none" stroke="var(--t-primary)" strokeWidth="1" opacity="0.22" />
        ))}
        <circle cx="200" cy="200" r="6" fill="var(--t-primary)" opacity="0.8" />
      </svg>

      <div className="boot-content">
        <div className="boot-spider">
          <div className="boot-spider__body">{char.svg}</div>
        </div>
        <h1 className="boot-title">
          <span className="boot-title__name">Pavan</span>
          <span className="boot-title__dot">.</span>
          <span className="boot-title__role">dev</span>
        </h1>
        <p className="boot-char-name">{char.name}</p>
        <p className="boot-sub">{char.sub}</p>
        <div className="boot-bar">
          <div className="boot-bar__fill" />
        </div>
        <p className="boot-hint">click to skip</p>
      </div>
    </div>
  )
}

export default BootScreen
