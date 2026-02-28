import { useContext, useState } from "react";
import { AchievementContext } from "../../../../context/AchievementContext";
import { ACHIEVEMENTS } from "../../../../config/constants";
import "./BackgroundChanger.scss";
import MacWindow from "../../MacWindow";

export default function BackgroundChanger({ windowName, setwindowState }) {
  const [ruined, setRuined] = useState(false);
  const { unlockAchievement } = useContext(AchievementContext);

  const handleColorChange = (e) => {
    const color = e.target.value;
    document.body.style.background = color;
    document.body.style.backgroundImage = "none";
    setRuined(true);
    unlockAchievement(ACHIEVEMENTS.WEBSITE_RUINER);
  };

  const resetBackground = () => {
    document.body.style.removeProperty('background');
    document.body.style.removeProperty('background-image');
    setRuined(false);
  };

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState}>
      <div className="fun-bg-wrapper">
        <h2 className="comic-title">🎨 Background Game</h2>

        <div className="picker-row">
          <input type="color" onChange={handleColorChange} />
        </div>

        {ruined && (
          <p className="comic-bubble">
            Great… you ruined my website 😭
          </p>
        )}

        {ruined && (
          <button className="comic-btn" onClick={resetBackground}>
            RESET!
          </button>
        )}
      </div>
    </MacWindow>
  );
}
