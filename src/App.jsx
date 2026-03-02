import React, { useState, useContext, useCallback, useRef, useEffect } from 'react'
import "./app.scss"
import Dock from './components/Dock'
import Nav from './components/Nav'
import Cli from './components/windows/Cli'
import Spotify from './components/windows/Spotify'
import AchievementsWindow from './components/windows/AchievementsWindow'
import AchievementPopup from './components/AchievementPopup'
import ErrorBoundary from './components/ErrorBoundary'
import BootScreen from './components/BootScreen'
import ContextMenu from './components/ContextMenu'
import GamesFolder from './components/windows/games/GamesFolder/GamesFolder'
import ThemeExplorer from './components/windows/games/ThemeExplorer/ThemeExplorer'
import MemoryWeb from './components/windows/games/MemoryWeb/MemoryWeb'
import SpiderType from './components/windows/games/SpiderType/SpiderType'
import OmnitrixTimeout from './components/windows/games/OmnitrixTimeout/OmnitrixTimeout'
import ContactWindow from './components/windows/ContactWindow'
import WebCursorTrail from './components/WebCursorTrail'
import DesktopSpider from './components/DesktopSpider'
import DesktopParticles from './components/DesktopParticles'
import { AchievementContext } from './context/AchievementContext'
import { useTheme } from './context/ThemeContext'
import { ACHIEVEMENTS } from './config/constants'

import DesktopOnly from "./components/DesktopOnly";

// ── App ───────────────────────────────────────────────────────────────────────
const App = () => {
  const [booted,      setBooted]      = useState(false)
  const [contextMenu, setContextMenu] = useState(null)

  const [windowState, setwindowState] = useState({
    resume:        false,
    spotify:       false,
    cli:           false,
    games:         false,
    themeExplorer: false,
    achievement:   false,
    memory:        false,
    spiderType:      false,
    omnitrixTimeout: false,
    contact:         false,
  })

  // z-index: clicking any window brings it to front
  const zCounter = useRef(100);
  const [windowZ, setWindowZ] = useState({});
  const bringToFront = useCallback((name) => {
    zCounter.current += 1;
    setWindowZ(wz => ({ ...wz, [name]: zCounter.current }));
  }, []);

  const { popup, unlockAchievement } = useContext(AchievementContext);
  const { visitedThemes, themes } = useTheme();

  useEffect(() => {
    if (visitedThemes.size >= Object.keys(themes).length) {
      unlockAchievement(ACHIEVEMENTS.SPIDER_VERSE);
    }
  }, [visitedThemes.size]);

  const handleContextMenu = (e) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  // Shared props for every MacWindow
  const wp = (name) => ({
    windowName:    name,
    setwindowState,
    zIndex:        windowZ[name] ?? 100,
    onFocus:       () => bringToFront(name),
  });

  return (
    <DesktopOnly>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {popup.type && <AchievementPopup key={popup.id} type={popup.type} />}

      <WebCursorTrail />

      <main onContextMenu={handleContextMenu}>
        <Nav />
        {booted && <DesktopParticles />}
        {booted && <DesktopSpider />}
        <Dock windowState={windowState} setwindowState={setwindowState} />

        {windowState.cli           && <ErrorBoundary><Cli                {...wp('cli')}           /></ErrorBoundary>}
        {windowState.spotify       && <ErrorBoundary><Spotify            {...wp('spotify')}       /></ErrorBoundary>}
        {windowState.games         && <ErrorBoundary><GamesFolder        {...wp('games')}         /></ErrorBoundary>}
        {windowState.themeExplorer && <ErrorBoundary><ThemeExplorer      {...wp('themeExplorer')} /></ErrorBoundary>}
        {windowState.achievement   && <ErrorBoundary><AchievementsWindow {...wp('achievement')}   /></ErrorBoundary>}
        {windowState.memory        && <ErrorBoundary><MemoryWeb          {...wp('memory')}        /></ErrorBoundary>}
        {windowState.spiderType      && <ErrorBoundary><SpiderType         {...wp('spiderType')}      /></ErrorBoundary>}
        {windowState.omnitrixTimeout && <ErrorBoundary><OmnitrixTimeout    {...wp('omnitrixTimeout')} /></ErrorBoundary>}
        {windowState.contact         && <ErrorBoundary><ContactWindow      {...wp('contact')}         /></ErrorBoundary>}
      </main>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          setwindowState={setwindowState}
        />
      )}
    </DesktopOnly>
  )
}

export default App
