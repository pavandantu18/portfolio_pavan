import { useContext, useState } from "react";
import { AchievementContext } from "../../context/AchievementContext";
import "./FunBackgroundGame.scss";
import MacWindow from "./MacWindow";

export default function FunBackgroundGame({windowName, setwindowState}) {
  const [ruined, setRuined] = useState(false);
  const { unlockAchievement } = useContext(AchievementContext);

  // Original dark gradient background from app.scss
  const originalBgGradient = "linear-gradient(135deg, #0a0a0f 0%, #1a0f1f 50%, #0f1f2e 100%)";
  const originalBgImage = "url('/background.png')";

  const handleColorChange = (e) => {
    const color = e.target.value;

    // Change background to solid color
    document.body.style.background = color;
    document.body.style.backgroundImage = "none";

    // Set ruined state
    setRuined(true);

    // Unlock achievement
    unlockAchievement("websiteRuiner");
  };

  const resetBackground = () => {
    // Clear inline styles to let CSS take over
    document.body.style.background = '';
    document.body.style.backgroundImage = '';
    document.body.style.removeProperty('background');
    document.body.style.removeProperty('background-image');
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
