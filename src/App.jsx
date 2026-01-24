import React, {useState, useContext} from 'react'
import "./app.scss"
import Dock from './components/Dock'
import Nav from './components/Nav'
import MacWindow from './components/windows/MacWindow'
import Notes from "./components/windows/Notes"
import Cli from './components/windows/Cli'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Spotify from './components/windows/Spotify'
import PickColor from './components/windows/PickColor'
import AchievementsWindow from './components/windows/AchievementsWindow'
import AchievementPopup from './components/AchievementPopup'
import { AchievementProvider, AchievementContext } from './context/AchievementContext'

import DesktopOnly from "./DesktopOnly";
const App = () => {

  const [windowState, setwindowState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
    color: false,
    achievement: false
  })

  const { popup } = useContext(AchievementContext);

  return (
    <DesktopOnly >
    {popup.type && <AchievementPopup key={popup.id} type={popup.type} />}

    <main>
      <Nav />
      <Dock windowState={windowState} setwindowState={setwindowState} />

        {windowState.note && <Notes windowName="note" setwindowState={setwindowState} />}
        {windowState.cli && <Cli windowName="cli" setwindowState={setwindowState} />}
        {windowState.spotify && <Spotify windowName="spotify" setwindowState={setwindowState} />}
        {windowState.color && <PickColor windowName="color" setwindowState={setwindowState} />}
        {windowState.achievement && <AchievementsWindow windowName="achievement" setwindowState={setwindowState}/>}
    </main>
    </DesktopOnly>
  )
}

export default App