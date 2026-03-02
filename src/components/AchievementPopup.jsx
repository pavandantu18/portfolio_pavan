import "./AchievementPopup.scss";

const badgeLabels = {
  spiderVerse:       "Spider-Verse Traveler",
  musicEnthusiastic: "Music Enthusiastic",
  knowMe:            "Know About Me",
  memoryMaster:      "Memory Master",
  speedTypist:       "Speed Typist",
  omnitrixTimeout:   "Omnitrix Master",
};

const badgeIcons = {
  spiderVerse:       "🌐",
  musicEnthusiastic: "🎶",
  knowMe:            "🔗",
  memoryMaster:      "🧠",
  speedTypist:       "⌨️",
  omnitrixTimeout:   "🟢",
};

export default function AchievementPopup({ type }) {
  if (!type) return null;

  return (
    <div className="achievement-popup">
      <div className="popup-inner">
        <span className="emoji">{badgeIcons[type]}</span>
        <div className="text-block">
          <span className="label">Achievement Unlocked</span>
          <span className="text">{badgeLabels[type]}</span>
        </div>
      </div>
    </div>
  );
}
