import { useContext, useEffect, useRef } from "react";
import { AchievementContext } from "../context/AchievementContext";
import { ACHIEVEMENTS, SOCIAL_LINKS } from "../config/constants";
import { RiGithubFill, RiSpotifyFill, RiMailFill, RiLinksLine, RiTerminalBoxFill, RiGamepadFill, RiFolderOpenFill } from "@remixicon/react";
import './Dock.scss'

const Dock = ({ setwindowState }) => {
  const { unlockAchievement } = useContext(AchievementContext);

  const dockRef    = useRef(null)
  const targetRef  = useRef({ y: 0, x: 0 })
  const currentRef = useRef({ y: 0, x: 0 })
  const rafRef     = useRef(null)

  useEffect(() => {
    const el = dockRef.current
    if (!el) return

    const onMouse = (e) => {
      const rect = el.getBoundingClientRect()
      // Horizontal: normalize relative to dock center → rotateY
      const nx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.65)))
      // Vertical: normalize relative to full screen → rotateX (mouse high = tilt toward viewer)
      const ny = (e.clientY / window.innerHeight - 0.5)
      targetRef.current = {
        y: nx * 14,          // ±14° left-right lean
        x: -ny * 10,         // ±5° forward-back tilt
      }
    }
    const onMouseLeave = () => {
      targetRef.current = { y: 0, x: 0 }
    }
    window.addEventListener('mousemove',  onMouse)
    window.addEventListener('mouseleave', onMouseLeave)

    const tick = () => {
      const t = targetRef.current
      const c = currentRef.current
      c.y += (t.y - c.y) * 0.09
      c.x += (t.x - c.x) * 0.09
      if (dockRef.current)
        dockRef.current.style.transform =
          `rotateY(${c.y}deg) rotateX(${c.x}deg)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove',  onMouse)
      window.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── Per-icon 3D pop-up ────────────────────────────────────────────────────
  // On hover: icon rises high and tilts its face toward the cursor in real time.
  // JS inline styles override the CSS :hover rule; clearing them on leave
  // lets the CSS transition animate the smooth return.
  useEffect(() => {
    const icons = dockRef.current?.querySelectorAll('.icon')
    if (!icons) return

    const cleanups = []

    icons.forEach(icon => {
      const onEnter = () => {
        // CSS transition still active here — rise animates smoothly
        icon.style.transform = 'translateY(-24px) scale(1.62) translateZ(34px)'
        icon.style.filter    = 'saturate(1.45) brightness(1.22)'
        icon.style.boxShadow =
          '0 22px 44px rgba(0,0,0,0.8), 0 0 28px var(--t-glow1), 0 0 10px var(--t-glow2)'
      }

      const onMove = (e) => {
        const rect = icon.getBoundingClientRect()
        // Normalised offset within icon: -1 (top/left) → +1 (bottom/right)
        const nx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2)
        const ny = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)
        // rotateX: positive = bottom toward viewer; cursor at bottom → rx +
        // rotateY: positive = left toward viewer;   cursor at left   → ry +
        const rx = Math.max(-22, Math.min(22,  ny * 22))
        const ry = Math.max(-22, Math.min(22, -nx * 22))
        // Suppress transform transition so tilt tracks cursor without lag
        icon.style.transition = 'box-shadow 0.25s ease, filter 0.22s ease'
        icon.style.transform  =
          `translateY(-24px) scale(1.62) translateZ(34px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg)`
      }

      const onLeave = () => {
        // Restore CSS transition so the return animates smoothly
        icon.style.transition = ''
        icon.style.transform  = ''
        icon.style.filter     = ''
        icon.style.boxShadow  = ''
      }

      icon.addEventListener('mouseenter', onEnter)
      icon.addEventListener('mousemove',  onMove)
      icon.addEventListener('mouseleave', onLeave)

      cleanups.push(() => {
        icon.removeEventListener('mouseenter', onEnter)
        icon.removeEventListener('mousemove',  onMove)
        icon.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [])

  return (
    <div className="dock-scene">
      <footer className='dock' ref={dockRef} role="navigation" aria-label="Application dock">
        <RiFolderOpenFill size={36} className='icon finder' onClick={
          () => { setwindowState(state => ({ ...state, finder: true })) }
        } aria-label="Open Finder" title="Finder" />

        <RiTerminalBoxFill size={36} className='icon cli' onClick={
          () => { setwindowState(state => ({ ...state, cli: true })) }
        } aria-label="Open Terminal" title="Terminal" />

        <RiGithubFill size={36} className='icon github' color='white' onClick={() => {
          window.open(SOCIAL_LINKS.github, "_blank")
        }} aria-label="Visit GitHub Profile" title="GitHub Profile" />

        <RiLinksLine size={36} className="icon link" onClick={() => {
          unlockAchievement(ACHIEVEMENTS.KNOW_ME);
          window.open(SOCIAL_LINKS.linkedin, "_blank");
        }} aria-label="Visit LinkedIn Profile" title="LinkedIn Profile" />

        <RiMailFill size={36} className='icon cli' onClick={() => {
          setwindowState(state => ({ ...state, contact: true }))
        }} aria-label="Send a Message" title="Send a Message" />

        <RiSpotifyFill size={36} className='icon spotify' onClick={
          () => {
            unlockAchievement(ACHIEVEMENTS.MUSIC_ENTHUSIASTIC)
            setwindowState(state => ({ ...state, spotify: true }))
          }
        } aria-label="Open Spotify" title="Spotify Playlist" />

        <RiGamepadFill size={36} className='icon mail' onClick={
          () => { setwindowState(state => ({ ...state, games: true })) }
        } aria-label="Open Games" title="Games" />
      </footer>
    </div>
  )
}

export default Dock
