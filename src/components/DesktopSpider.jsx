import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SPIDER_CHARS } from '../config/spiderChars'
import './DesktopSpider.scss'

const DesktopSpider = () => {
  const { themeId } = useTheme()
  const char = SPIDER_CHARS[themeId] ?? SPIDER_CHARS.classic

  const figureRef  = useRef(null)
  const labelRef   = useRef(null)
  const wrapperRef = useRef(null)               // parallax translate target
  const targetRef  = useRef({ x: 0, y: 0 })    // rotation angles
  const currentRef = useRef({ x: 0, y: 0 })
  const transTargetRef  = useRef({ x: 0, y: 0 }) // translate px
  const transCurrentRef = useRef({ x: 0, y: 0 })
  const rafRef     = useRef(null)

  useEffect(() => {
    const onMouse = (e) => {
      targetRef.current = {
        x: ((e.clientY / window.innerHeight) - 0.5) * -24,
        y: ((e.clientX / window.innerWidth)  - 0.5) *  24,
      }
      // depth layer 4 — farthest forward, largest shift
      transTargetRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 100,
        y: (e.clientY / window.innerHeight - 0.5) * 100,
      }
    }
    window.addEventListener('mousemove', onMouse)

    const tick = () => {
      const t  = targetRef.current
      const c  = currentRef.current
      c.x += (t.x - c.x) * 0.07
      c.y += (t.y - c.y) * 0.07

      const tt = transTargetRef.current
      const tc = transCurrentRef.current
      tc.x += (tt.x - tc.x) * 0.05
      tc.y += (tt.y - tc.y) * 0.05

      if (wrapperRef.current)
        wrapperRef.current.style.transform =
          `translate(${tc.x.toFixed(2)}px, ${tc.y.toFixed(2)}px)`

      if (figureRef.current)
        figureRef.current.style.transform =
          `rotateX(${c.x}deg) rotateY(${c.y}deg)`

      if (labelRef.current)
        labelRef.current.style.transform =
          `rotateX(${c.x * 0.4}deg) rotateY(${c.y * 0.4}deg) translateZ(10px)`

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="desktop-spider" key={themeId} ref={wrapperRef}>
      {/* perspective scene — children get 3D projected from here */}
      <div className="desktop-spider__scene">
        <div className="desktop-spider__figure" ref={figureRef}>
          {char.svg}
        </div>
      </div>
      <div className="desktop-spider__label" ref={labelRef}>
        <span className="desktop-spider__name">{char.name}</span>
      </div>
    </div>
  )
}

export default DesktopSpider
