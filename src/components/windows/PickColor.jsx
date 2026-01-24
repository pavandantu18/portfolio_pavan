import { useContext, useState } from "react";
import { AchievementContext } from "../../context/AchievementContext";
import "./FunBackgroundGame.scss";
import MacWindow from "./MacWindow";

export default function FunBackgroundGame({windowName, setwindowState}) {
  const [ruined, setRuined] = useState(false);
  const { unlockAchievement } = useContext(AchievementContext);

  const originalBg = "url('/your-original-bg.jpg')"; // update this if needed

  const handleColorChange = (e) => {
    const color = e.target.value;

    // Change background image
    document.body.style.background = color;
    document.body.style.backgroundImage = "none";

    // Set ruined state
    setRuined(true);

    // Unlock achievement
    unlockAchievement("websiteRuiner");
  };

  const resetBackground = () => {
    document.body.style.background = "";
    document.body.style.backgroundImage = originalBg;
    setRuined(false);
  };

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState}>
    <div className="fun-bg-wrapper">
      {/* Title */}
      <h2 className="comic-title">🎨 Background Game</h2>

      {/* Color Picker */}
      <div className="picker-row">
        <input type="color" onChange={handleColorChange} />
      </div>

      {/* Funny bubble when ruined */}
      {ruined && (
        <p className="comic-bubble">
          Great… you ruined my website 😭
        </p>
      )}

      {/* Reset Button */}
      {ruined && (
        <button className="comic-btn" onClick={resetBackground}>
          RESET!
        </button>
      )}
    </div>
    </MacWindow>
  );
}
