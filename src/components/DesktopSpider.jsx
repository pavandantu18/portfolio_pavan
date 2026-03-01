import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SPIDER_CHARS } from '../config/spiderChars'
import './DesktopSpider.scss'

const DesktopSpider = () => {
  const { themeId } = useTheme()
  const char = SPIDER_CHARS[themeId] ?? SPIDER_CHARS.classic

  const figureRef  = useRef(null)
  const labelRef   = useRef(null)
  const targetRef  = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef     = useRef(null)

  useEffect(() => {
    const onMouse = (e) => {
      targetRef.current = {
        x: ((e.clientY / window.innerHeight) - 0.5) * -24,
        y: ((e.clientX / window.innerWidth)  - 0.5) *  24,
      }
    }
    window.addEventListener('mousemove', onMouse)

    const tick = () => {
      const t = targetRef.current
      const c = currentRef.current
      c.x += (t.x - c.x) * 0.07
      c.y += (t.y - c.y) * 0.07

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
    <div className="desktop-spider" key={themeId}>
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
