import { useState, useEffect } from 'react'
import './BootScreen.scss'

const BootScreen = ({ onDone }) => {
  const [phase, setPhase] = useState('enter')

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
              stroke="rgba(220,38,38,0.4)" strokeWidth="1"
            />
          )
        })}
        {[30, 65, 105, 150, 200].map((r, i) => (
          <circle key={i} cx="200" cy="200" r={r}
            fill="none" stroke="rgba(220,38,38,0.25)" strokeWidth="1" />
        ))}
        <circle cx="200" cy="200" r="6" fill="rgba(220,38,38,0.8)" />
      </svg>

      <div className="boot-content">
        <div className="boot-spider">
          <span className="boot-spider__body">🕷</span>
        </div>
        <h1 className="boot-title">
          <span className="boot-title__name">Pavan</span>
          <span className="boot-title__dot">.</span>
          <span className="boot-title__role">dev</span>
        </h1>
        <p className="boot-sub">Portfolio · Spider-Man Edition</p>
        <div className="boot-bar">
          <div className="boot-bar__fill" />
        </div>
        <p className="boot-hint">click to skip</p>
      </div>
    </div>
  )
}

export default BootScreen
