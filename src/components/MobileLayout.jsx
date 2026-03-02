import { useState, useContext, useCallback, useRef, useEffect } from 'react'
import { AchievementContext } from '../context/AchievementContext'
import { ACHIEVEMENTS, SOCIAL_LINKS } from '../config/constants'
import { useTheme } from '../context/ThemeContext'
import { SPIDER_CHARS } from '../config/spiderChars'
import ErrorBoundary from './ErrorBoundary'
import DesktopParticles from './DesktopParticles'
import BootScreen from './BootScreen'
import AchievementPopup from './AchievementPopup'
import Cli from './windows/Cli'
import Spotify from './windows/Spotify'
import AchievementsWindow from './windows/AchievementsWindow'
import ContactWindow from './windows/ContactWindow'
import GamesFolder from './windows/games/GamesFolder/GamesFolder'
import ThemeExplorer from './windows/games/ThemeExplorer/ThemeExplorer'
import MemoryWeb from './windows/games/MemoryWeb/MemoryWeb'
import SpiderType from './windows/games/SpiderType/SpiderType'
import OmnitrixTimeout from './windows/games/OmnitrixTimeout/OmnitrixTimeout'
import {
  RiTerminalBoxFill, RiSpotifyFill, RiMailFill,
  RiGithubFill, RiGamepadFill, RiLinksLine,
} from '@remixicon/react'
import './mobile.scss'

// ── Battery SVG ──────────────────────────────────────────────────────────────
const BatterySvg = () => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
    <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35" />
    <rect x="2" y="2" width="15" height="8" rx="2" fill="white" />
    <path d="M23 4.5v3a2 2 0 0 0 0-3z" fill="white" fillOpacity="0.4" />
  </svg>
)

// ── WiFi SVG ─────────────────────────────────────────────────────────────────
const WifiSvg = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
    <circle cx="8" cy="10.5" r="1.5" fill="white" />
    <path d="M4.5 7.5a5 5 0 0 1 7 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <path d="M1.5 4.5a8.5 8.5 0 0 1 13 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
)

// ── Signal SVG ───────────────────────────────────────────────────────────────
const SignalSvg = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="white" aria-hidden="true">
    <rect x="0"    y="7" width="3" height="5" rx="1" opacity="0.4" />
    <rect x="4.5"  y="5" width="3" height="7" rx="1" opacity="0.6" />
    <rect x="9"    y="2" width="3" height="10" rx="1" opacity="0.8" />
    <rect x="13.5" y="0" width="3" height="12" rx="1" />
  </svg>
)

// ── MobileLayout ─────────────────────────────────────────────────────────────
const MobileLayout = () => {
  const [booted, setBooted] = useState(false)
  const [windowState, setWindowState] = useState({
    cli: false, spotify: false, contact: false,
    games: false, themeExplorer: false, achievement: false,
    memory: false, spiderType: false, omnitrixTimeout: false,
  })

  const { popup, unlockAchievement } = useContext(AchievementContext)
  const { themeId } = useTheme()
  const char = SPIDER_CHARS[themeId] ?? SPIDER_CHARS.classic

  const zCounter = useRef(100)
  const [windowZ, setWindowZ] = useState({})
  const bringToFront = useCallback((name) => {
    zCounter.current += 1
    setWindowZ(wz => ({ ...wz, [name]: zCounter.current }))
  }, [])

  // Tap-to-launch: play icon bounce, then open window after 140ms
  const [tappingKey, setTappingKey] = useState(null)
  const handleAppTap = useCallback((app) => {
    if (tappingKey) return
    setTappingKey(app.key)
    setTimeout(() => {
      app.onClick()
      setTappingKey(null)
    }, 140)
  }, [tappingKey])

  const wp = (name) => ({
    windowName:    name,
    setwindowState: setWindowState,
    zIndex:        windowZ[name] ?? 100,
    onFocus:       () => bringToFront(name),
  })

  // Live clock
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])
  const timeStr = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  // App definitions
  const apps = [
    {
      key: 'cli', color: '#e8c96a', label: 'Terminal',
      icon: <RiTerminalBoxFill size={34} />,
      onClick: () => setWindowState(s => ({ ...s, cli: true })),
    },
    {
      key: 'spotify', color: '#4fd1a5', label: 'Spotify',
      icon: <RiSpotifyFill size={34} />,
      onClick: () => {
        unlockAchievement(ACHIEVEMENTS.MUSIC_ENTHUSIASTIC)
        setWindowState(s => ({ ...s, spotify: true }))
      },
    },
    {
      key: 'contact', color: '#ff9a9a', label: 'Contact',
      icon: <RiMailFill size={34} />,
      onClick: () => setWindowState(s => ({ ...s, contact: true })),
    },
    {
      key: 'github', color: '#c9d1d9', label: 'GitHub',
      icon: <RiGithubFill size={34} />,
      onClick: () => window.open(SOCIAL_LINKS.github, '_blank'),
    },
    {
      key: 'linkedin', color: '#82c4ff', label: 'LinkedIn',
      icon: <RiLinksLine size={34} />,
      onClick: () => {
        unlockAchievement(ACHIEVEMENTS.KNOW_ME)
        window.open(SOCIAL_LINKS.linkedin, '_blank')
      },
    },
    {
      key: 'games', color: '#d97a92', label: 'Games',
      icon: <RiGamepadFill size={34} />,
      onClick: () => setWindowState(s => ({ ...s, games: true })),
    },
  ]

  const dockApps = apps.slice(0, 4)

  return (
    <div className="mob-layout">
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {popup.type && <AchievementPopup key={popup.id} type={popup.type} />}

      {/* Particle canvas background */}
      <DesktopParticles />

      {/* Status bar */}
      <div className="mob-statusbar">
        <span className="mob-statusbar__time">{timeStr}</span>
        <div className="mob-dynamic-island" />
        <div className="mob-statusbar__right">
          <SignalSvg />
          <WifiSvg />
          <BatterySvg />
        </div>
      </div>

      {/* Main content — hero + app grid */}
      {booted && (
        <div className="mob-main">
          {/* Spider character hero */}
          <div className="mob-hero">
            <div className="mob-hero__svg">{char.svg}</div>
            <p className="mob-hero__name">{char.name}</p>
          </div>

          {/* App icon grid */}
          <div className="mob-grid">
            {apps.map(app => (
              <button
                key={app.key}
                className={`mob-app${tappingKey === app.key ? ' mob-app--tapping' : ''}`}
                onClick={() => handleAppTap(app)}
              >
                <div className="mob-app__icon" style={{ color: app.color }}>
                  {app.icon}
                </div>
                <span className="mob-app__label">{app.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Window renders — MacWindow auto-detects mobile and renders as sheet */}
      {windowState.cli           && <ErrorBoundary><Cli                {...wp('cli')}           /></ErrorBoundary>}
      {windowState.spotify       && <ErrorBoundary><Spotify            {...wp('spotify')}       /></ErrorBoundary>}
      {windowState.contact       && <ErrorBoundary><ContactWindow      {...wp('contact')}       /></ErrorBoundary>}
      {windowState.games         && <ErrorBoundary><GamesFolder        {...wp('games')}         /></ErrorBoundary>}
      {windowState.themeExplorer && <ErrorBoundary><ThemeExplorer      {...wp('themeExplorer')} /></ErrorBoundary>}
      {windowState.achievement   && <ErrorBoundary><AchievementsWindow {...wp('achievement')}   /></ErrorBoundary>}
      {windowState.memory        && <ErrorBoundary><MemoryWeb          {...wp('memory')}        /></ErrorBoundary>}
      {windowState.spiderType    && <ErrorBoundary><SpiderType         {...wp('spiderType')}    /></ErrorBoundary>}
      {windowState.omnitrixTimeout && <ErrorBoundary><OmnitrixTimeout  {...wp('omnitrixTimeout')} /></ErrorBoundary>}

      {/* Bottom dock */}
      {booted && (
        <div className="mob-dock">
          {dockApps.map(app => (
            <button
              key={app.key}
              className={`mob-dock__btn${tappingKey === app.key ? ' mob-dock__btn--tapping' : ''}`}
              style={{ color: app.color }}
              onClick={() => handleAppTap(app)}
              aria-label={app.label}
            >
              {app.icon}
            </button>
          ))}
        </div>
      )}

      {/* Home indicator */}
      <div className="mob-home-bar" />
    </div>
  )
}

export default MobileLayout
