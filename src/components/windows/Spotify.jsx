import React from 'react'
import MacWindow from './MacWindow'
import "./spotify.scss"

const Spotify = ({windowName,setwindowState}) => {
  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState}>
        <div className="spotify-window" >
            <iframe data-testid="embed-iframe"  src="https://open.spotify.com/embed/playlist/5muSk2zfQ3LI70S64jbrX7?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" loading="lazy"></iframe>
        </div>
    </MacWindow>
  )
}

export default Spotify