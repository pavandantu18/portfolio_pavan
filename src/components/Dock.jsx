import { useContext, useEffect, useRef } from "react";
import { AchievementContext } from "../context/AchievementContext";
import { ACHIEVEMENTS, SOCIAL_LINKS } from "../config/constants";
import { RiGithubFill, RiMedalFill, RiSpotifyFill, RiMailFill, RiLinksLine, RiTerminalBoxFill, RiGamepadFill } from "@remixicon/react";
import './dock.scss'

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

  return (
    <div className="dock-scene">
      <footer className='dock' ref={dockRef} role="navigation" aria-label="Application dock">
        <RiTerminalBoxFill size={36} className='icon cli' onClick={
          () => { setwindowState(state => ({ ...state, cli: true })) }
        } aria-label="Open Terminal" title="Terminal" />

        <RiSpotifyFill size={36} className='icon spotify' onClick={
          () => {
            unlockAchievement(ACHIEVEMENTS.MUSIC_ENTHUSIASTIC)
            setwindowState(state => ({ ...state, spotify: true }))
          }
        } aria-label="Open Spotify" title="Spotify Playlist" />

        <RiLinksLine size={36} className="icon link" onClick={() => {
          unlockAchievement(ACHIEVEMENTS.KNOW_ME);
          window.open(SOCIAL_LINKS.linkedin, "_blank");
        }} aria-label="Visit LinkedIn Profile" title="LinkedIn Profile" />

        <RiMailFill size={36} className='icon cli' onClick={() => {
          setwindowState(state => ({ ...state, contact: true }))
        }} aria-label="Send a Message" title="Send a Message" />

        <RiGithubFill size={36} className='icon github' color='white' onClick={() => {
          window.open(SOCIAL_LINKS.github, "_blank")
        }} aria-label="Visit GitHub Profile" title="GitHub Profile" />

        <RiGamepadFill size={36} className='icon mail' onClick={
          () => { setwindowState(state => ({ ...state, games: true })) }
        } aria-label="Open Games" title="Games" />

        <RiMedalFill size={36} className='icon spotify' onClick={
          () => { setwindowState(state => ({ ...state, achievement: true })) }
        } aria-label="View Achievements" title="Achievements" />
      </footer>
    </div>
  )
}

export default Dock
