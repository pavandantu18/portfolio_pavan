import React from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"

const MacWindow = ({children, windowName, setwindowState}) => {
  return (
    <Rnd>
        <div className="window">
            <div className="nav">
                <div className="dots">
                    <div className="dot red" onClick={() => setwindowState(state => ({...state,[windowName]: false}))}></div>
                    {/* <div className="dot yellow"></div>
                    <div className="dot green"></div> */}
                </div>
            <div className="title">
                <p>pavankumar - zsh</p>
            </div>
            </div>
            <div className="main-content">
                {children}
            </div>
        </div>
    </Rnd>
  )
}

export default MacWindow