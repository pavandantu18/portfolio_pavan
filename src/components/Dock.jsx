import React from 'react'
import { RiGithubFill, RiStickyNoteFill, RiFilePdf2Fill, RiCalendarFill,RiSpotifyFill , RiMailFill,RiLinksLine, RiTerminalBoxFill } from "@remixicon/react";
import './dock.scss'
const Dock = ({windowState,setwindowState}) => {
  return (
    <footer className='dock'>
        <RiTerminalBoxFill size={36}  className='icon cli' onClick={
          () => {setwindowState(state => ({...state, cli:true}))}
        }/>
        
        <RiStickyNoteFill size={36}  className='icon note' color='white' onClick={
          () => {setwindowState(state => ({...state, note:true}))}
        }/>
        {/* <RiFilePdf2Fill  size={36}  className='icon pdf'/> */}
        <RiCalendarFill  size={36}  className='icon calender' onClick={() => {
          window.open("https://calendar.google.com/","_blank")
        }}/>
        <RiSpotifyFill  size={36}  className='icon spotify' onClick={
          () => {setwindowState(state => ({...state, spotify:true}))}
        }/>
        <RiMailFill size={36}  className='icon mail' onClick={() => {
          window.open("mailto:pavandantu2507@gmail.com","_blank")
        }}/>
        <RiLinksLine size={36}  className='icon link' onClick={
          () => {window.open("https://www.linkedin.com/in/pavandantu18/","_blank")}
        }/>
        <RiGithubFill size={36}  className='icon github' onClick={() => {
          window.open("https://github.com/pavandantu18","_blank")
        }}/>
    </footer>
  )
}

export default Dock