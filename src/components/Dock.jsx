import { useContext } from "react";
import { AchievementContext } from "../context/AchievementContext";

import { RiGithubFill, RiStickyNoteFill, RiGameFill, RiMedalFill, RiCalendarFill, RiSpotifyFill, RiMailFill, RiLinksLine, RiTerminalBoxFill } from "@remixicon/react";
import './dock.scss'
import AchievementsWindow from './windows/AchievementsWindow';
const Dock = ({ windowState, setwindowState }) => {
  const { unlockAchievement, musicEnthusiastic } = useContext(AchievementContext);

  return (
    <footer className='dock'>
      <RiTerminalBoxFill size={36} className='icon cli' onClick={
        () => { setwindowState(state => ({ ...state, cli: true })) }
      } />

      <RiStickyNoteFill size={36} className='icon note' color='white' onClick={
        () => { setwindowState(state => ({ ...state, note: true })) }
      } />


      {/* <RiFilePdf2Fill  size={36}  className='icon pdf'/> */}
      <RiCalendarFill size={36} className='icon mail' onClick={() => {
        window.open("https://calendar.google.com/", "_blank")
      }} />

      <RiSpotifyFill size={36} className='icon spotify' onClick={
        () => { 
          unlockAchievement("musicEnthusiastic")
          setwindowState(state => ({ ...state, spotify: true }

          )) }
      } />

      <RiLinksLine
        size={36}
        className="icon link"
        onClick={() => {
          unlockAchievement("knowMe");
          window.open("https://www.linkedin.com/in/pavandantu18/", "_blank");
        }}
      />

      <RiMailFill size={36} className='icon cli' onClick={() => {
        window.open("mailto:pavandantu2507@gmail.com", "_blank")
      }} />

      <RiGithubFill size={36} className='icon github' color='white' onClick={() => {
        window.open("https://github.com/pavandantu18", "_blank")
      }} />

      <RiGameFill size={36} className='icon mail' onClick={
        () => { setwindowState(state => ({ ...state, color: true })) }
      } />

      <RiMedalFill size={36} className='icon spotify' onClick={
        () => { setwindowState(state => ({ ...state, achievement: true })) }
      } />


    </footer>
  )
}

export default Dock