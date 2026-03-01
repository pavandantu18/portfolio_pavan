import React, { useEffect, useRef } from 'react'
import "./nav.scss"
import { RiAppleFill, RiWifiLine } from "@remixicon/react";
import DateTime from './DateTime';
import { useTheme } from '../context/ThemeContext';

const Nav = () => {
  const { themeId, setThemeId, themes } = useTheme();

  const navRef     = useRef(null)
  const targetRef  = useRef({ x: 0, y: 0, z: 0 })
  const currentRef = useRef({ x: 0, y: 0, z: 0 })
  const rafRef     = useRef(null)

  useEffect(() => {
    const onMouse = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      const nx = (e.clientX / W) - 0.5   // -0.5 … +0.5
      targetRef.current = {
        x: ((e.clientY / H) - 0.5) * -14,   // ±7° rotateX
        y: nx * 8,                            // ±4° rotateY
        z: nx * -3.5,                         // ±1.75° cockpit bank (roll into turn)
      }
    }
    const onMouseLeave = () => {
      targetRef.current = { x: 0, y: 0, z: 0 }
    }
    window.addEventListener('mousemove',  onMouse)
    window.addEventListener('mouseleave', onMouseLeave)

    const tick = () => {
      const t = targetRef.current
      const c = currentRef.current
      c.x += (t.x - c.x) * 0.05
      c.y += (t.y - c.y) * 0.05
      c.z += (t.z - c.z) * 0.05
      if (navRef.current)
        navRef.current.style.transform =
          `perspective(900px) rotateX(${c.x}deg) rotateY(${c.y}deg) rotateZ(${c.z}deg)`
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
          {Object.values(themes).map(t => (
            <button
              key={t.id}
              className={`theme-dot${themeId === t.id ? ' theme-dot--active' : ''}`}
              style={{ '--td': t.swatch }}
              onClick={() => setThemeId(t.id)}
              title={`${t.name} · ${t.subtitle}`}
            />
          ))}
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
