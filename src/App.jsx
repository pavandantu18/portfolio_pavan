import React, { useState, useContext } from 'react'
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
import BackgroundChanger from './components/windows/games/BackgroundChanger/BackgroundChanger'
import MemoryWeb from './components/windows/games/MemoryWeb/MemoryWeb'
import SpiderType from './components/windows/games/SpiderType/SpiderType'
import SpiderSense from './components/windows/games/SpiderSense/SpiderSense'
import ContactWindow from './components/windows/ContactWindow'
import { AchievementContext } from './context/AchievementContext'

import DesktopOnly from "./DesktopOnly";

const App = () => {
  const [booted, setBooted] = useState(false)
  const [contextMenu, setContextMenu] = useState(null)

  const [windowState, setwindowState] = useState({
    resume: false,
    spotify: false,
    cli: false,
    games: false,
    color: false,
    achievement: false,
    memory: false,
    spiderType: false,
    spiderSense: false,
    contact: false,
  })

  const { popup } = useContext(AchievementContext);

  const handleContextMenu = (e) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <DesktopOnly>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {popup.type && <AchievementPopup key={popup.id} type={popup.type} />}

      <main onContextMenu={handleContextMenu}>
        <Nav />
        <Dock windowState={windowState} setwindowState={setwindowState} />

        {windowState.cli         && <ErrorBoundary><Cli                windowName="cli"         setwindowState={setwindowState} /></ErrorBoundary>}
        {windowState.spotify     && <ErrorBoundary><Spotify            windowName="spotify"     setwindowState={setwindowState} /></ErrorBoundary>}
        {windowState.games       && <ErrorBoundary><GamesFolder        windowName="games"       setwindowState={setwindowState} /></ErrorBoundary>}
        {windowState.color       && <ErrorBoundary><BackgroundChanger  windowName="color"       setwindowState={setwindowState} /></ErrorBoundary>}
        {windowState.achievement && <ErrorBoundary><AchievementsWindow windowName="achievement" setwindowState={setwindowState} /></ErrorBoundary>}
        {windowState.memory      && <ErrorBoundary><MemoryWeb          windowName="memory"      setwindowState={setwindowState} /></ErrorBoundary>}
        {windowState.spiderType  && <ErrorBoundary><SpiderType         windowName="spiderType"  setwindowState={setwindowState} /></ErrorBoundary>}
        {windowState.spiderSense && <ErrorBoundary><SpiderSense        windowName="spiderSense" setwindowState={setwindowState} /></ErrorBoundary>}
        {windowState.contact     && <ErrorBoundary><ContactWindow      windowName="contact"     setwindowState={setwindowState} /></ErrorBoundary>}
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
