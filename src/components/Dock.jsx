import { useContext } from "react";
import { AchievementContext } from "../context/AchievementContext";
import { ACHIEVEMENTS, SOCIAL_LINKS } from "../config/constants";
import { RiGithubFill, RiStickyNoteFill, RiMedalFill, RiCalendarFill, RiSpotifyFill, RiMailFill, RiLinksLine, RiTerminalBoxFill, RiGamepadFill } from "@remixicon/react";
import './dock.scss'

const Dock = ({ setwindowState }) => {
  const { unlockAchievement } = useContext(AchievementContext);

  return (
    <footer className='dock' role="navigation" aria-label="Application dock">
      <RiTerminalBoxFill size={36} className='icon cli' onClick={
        () => { setwindowState(state => ({ ...state, cli: true })) }
      } aria-label="Open Terminal"
      title="Terminal" />

      <RiStickyNoteFill size={36} className='icon note' color='white' onClick={
        () => { setwindowState(state => ({ ...state, note: true })) }
      } aria-label="Open Notes" title="Skills & Notes" />


      {/* <RiFilePdf2Fill  size={36}  className='icon pdf'/> */}
      <RiCalendarFill size={36} className='icon mail' onClick={() => {
        window.open(SOCIAL_LINKS.calendar, "_blank")
      }} aria-label="Open Calendar" title="Google Calendar" />

      <RiSpotifyFill size={36} className='icon spotify' onClick={
        () => {
          unlockAchievement(ACHIEVEMENTS.MUSIC_ENTHUSIASTIC)
          setwindowState(state => ({ ...state, spotify: true }

          )) }
      } aria-label="Open Spotify" title="Spotify Playlist" />

      <RiLinksLine
        size={36}
        className="icon link"
        onClick={() => {
          unlockAchievement(ACHIEVEMENTS.KNOW_ME);
          window.open(SOCIAL_LINKS.linkedin, "_blank");
        }}
        aria-label="Visit LinkedIn Profile"
        title="LinkedIn Profile"
      />

      <RiMailFill size={36} className='icon cli' onClick={() => {
        window.open(`mailto:${SOCIAL_LINKS.email}`, "_blank")
      }} aria-label="Send Email" title="Email" />

      <RiGithubFill size={36} className='icon github' color='white' onClick={() => {
        window.open(SOCIAL_LINKS.github, "_blank")
      }} aria-label="Visit GitHub Profile" title="GitHub Profile" />

      <RiGamepadFill size={36} className='icon mail' onClick={
        () => { setwindowState(state => ({ ...state, games: true })) }
      } aria-label="Open Games" title="Games" />

      <RiMedalFill size={36} className='icon spotify' onClick={
        () => { setwindowState(state => ({ ...state, achievement: true })) }
      } aria-label="View Achievements" title="Achievements" />


    </footer>
  )
}

export default Dock