import React from 'react'
import MacWindow from './MacWindow'
import { SPOTIFY_EMBED_URL } from '../../config/constants'
import "./Spotify.scss"

const Spotify = ({windowName, setwindowState, zIndex, onFocus}) => {
  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus}>
        <div className="spotify-window" >
            <iframe data-testid="embed-iframe" src={SPOTIFY_EMBED_URL} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" loading="lazy"></iframe>
        </div>
    </MacWindow>
  )
}

export default Spotify