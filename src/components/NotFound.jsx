import { useTheme } from '../context/ThemeContext'
import { SPIDER_CHARS } from '../config/spiderChars'
import './NotFound.scss'

const NotFound = () => {
  const { themeId } = useTheme()
  const char = SPIDER_CHARS[themeId] ?? SPIDER_CHARS.classic

  return (
    <div className="nf">
      {/* Rotating web background */}
      <svg className="nf__web" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          return (
            <line key={i}
              x1="200" y1="200"
              x2={200 + Math.cos(angle) * 200}
              y2={200 + Math.sin(angle) * 200}
              stroke="var(--t-primary)" strokeWidth="1" opacity="0.5"
            />
          )
        })}
        {[32, 68, 108, 152, 198].map((r, i) => (
          <circle key={i} cx="200" cy="200" r={r}
            fill="none" stroke="var(--t-primary)" strokeWidth="1" opacity={0.35 - i * 0.05} />
        ))}
        <circle cx="200" cy="200" r="5" fill="var(--t-primary)" opacity="0.7" />
      </svg>

      {/* Spider hanging on thread from top */}
      <div className="nf__thread-wrap">
        <div className="nf__thread" />
        <div className="nf__char">{char.svg}</div>
      </div>

      {/* Content */}
      <div className="nf__content">
        <div className="nf__code">404</div>

        {/* Web-crack divider */}
        <svg className="nf__crack" viewBox="0 0 300 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12 L60 12 L72 4 L84 18 L96 8 L108 16 L120 12 L180 12"
            fill="none" stroke="var(--t-primary)" strokeWidth="1.2" opacity="0.55"/>
          <circle cx="150" cy="12" r="3" fill="var(--t-primary)" opacity="0.7"/>
          <path d="M120 12 L180 12 L192 4 L204 18 L216 8 L228 16 L240 12 L300 12"
            fill="none" stroke="var(--t-primary)" strokeWidth="1.2" opacity="0.55"/>
          <line x1="150" y1="12" x2="130" y2="0"  stroke="var(--t-primary)" strokeWidth="0.8" opacity="0.35"/>
          <line x1="150" y1="12" x2="170" y2="0"  stroke="var(--t-primary)" strokeWidth="0.8" opacity="0.35"/>
          <line x1="150" y1="12" x2="128" y2="24" stroke="var(--t-primary)" strokeWidth="0.8" opacity="0.3"/>
          <line x1="150" y1="12" x2="172" y2="24" stroke="var(--t-primary)" strokeWidth="0.8" opacity="0.3"/>
        </svg>

        <p className="nf__headline">Looks like Spidey lost the thread.</p>
        <p className="nf__sub">The page you're looking for swung away.</p>

        <div className="nf__bar"><div className="nf__bar-fill" /></div>

        <button className="nf__btn" onClick={() => { window.location.href = '/' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Swing Back Home
        </button>

        <p className="nf__hint">pavan.dev</p>
      </div>
    </div>
  )
}

export default NotFound
