import React, {useState} from 'react'
import "./app.scss"
import Dock from './components/Dock'
import Nav from './components/Nav'
import MacWindow from './components/windows/MacWindow'
import Notes from "./components/windows/Notes"
import Cli from './components/windows/Cli'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Spotify from './components/windows/Spotify'
const App = () => {

  const [windowState, setwindowState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false
  })

  return (
    <main>
      <Nav />
      <Dock windowState={windowState} setwindowState={setwindowState} />

        {windowState.note && <Notes windowName="note" setwindowState={setwindowState} />}
        {windowState.cli && <Cli windowName="cli" setwindowState={setwindowState} />}
        {windowState.spotify && <Spotify windowName="spotify" setwindowState={setwindowState} />}
    </main>
  )
}

export default App