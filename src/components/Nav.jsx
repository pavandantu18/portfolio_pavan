import React, { useEffect, useRef } from 'react'
import "./Nav.scss"
import { RiAppleFill, RiWifiLine } from "@remixicon/react";
import DateTime from './DateTime';
import { useTheme } from '../context/ThemeContext';

const GROUPS = [
  { id: 'spiderman', label: 'SM' },
  { id: 'pokemon',   label: 'PK' },
  { id: 'ben10',     label: 'B10' },
]

const Nav = () => {
  const { themeId, setThemeId, themes } = useTheme();

  const navRef     = useRef(null)
  const targetRef  = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef     = useRef(null)

  useEffect(() => {
    const onMouse = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      const nx = (e.clientX / W) - 0.5   // -0.5 … +0.5
      const ny = (e.clientY / H) - 0.5   // -0.5 … +0.5
      // Parallax: nav drifts slightly opposite the cursor — like a distant plane
      targetRef.current = {
        x: nx * -6,   // ±3px horizontal drift
        y: ny * -2,   // ±1px vertical drift (very subtle)
      }
    }
    const onMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 }
    }
    window.addEventListener('mousemove',  onMouse)
    window.addEventListener('mouseleave', onMouseLeave)

    const tick = () => {
      const t = targetRef.current
      const c = currentRef.current
      c.x += (t.x - c.x) * 0.05
      c.y += (t.y - c.y) * 0.05
      if (navRef.current)
        navRef.current.style.transform =
          `translateX(${c.x}px) translateY(${c.y}px)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove',  onMouse)
      window.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <nav ref={navRef}>
      <div className="left">
        <div className="nav-item no-underline apple-icon">
          <RiAppleFill size={20} color="white" />
        </div>
        <div className="nav-item no-underline">
          <p>Pavan Kumar Reddy Dantu</p>
        </div>
      </div>

      <div className="right">
        <div className="nav-themes no-underline">
          {GROUPS.map((grp, gi) => {
            const grpThemes = Object.values(themes).filter(t => t.group === grp.id)
            if (!grpThemes.length) return null
            return (
              <React.Fragment key={grp.id}>
                {gi > 0 && <div className="nav-group-divider" />}
                <div className="nav-theme-group">
                  <span className="nav-group-label">{grp.label}</span>
                  {grpThemes.map(t => (
                    <button
                      key={t.id}
                      className={`theme-dot${themeId === t.id ? ' theme-dot--active' : ''}`}
                      style={{ '--td': t.swatch }}
                      onClick={() => setThemeId(t.id)}
                      title={`${t.name} · ${t.subtitle}`}
                    />
                  ))}
                </div>
              </React.Fragment>
            )
          })}
        </div>

        <div className="nav-divider no-underline" />

        <div className="nav-icon no-underline">
          <RiWifiLine size={18} />
        </div>

        <div className="nav-item no-underline">
          <DateTime />
        </div>
      </div>
    </nav>
  )
}

export default Nav
