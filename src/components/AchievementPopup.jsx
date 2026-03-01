import "./AchievementPopup.scss";

const badgeLabels = {
  websiteRuiner:     "Website Ruiner",
  musicEnthusiastic: "Music Enthusiastic",
  knowMe:            "Know About Me",
  memoryMaster:      "Memory Master",
  speedTypist:       "Speed Typist",
  omnitrixTimeout:   "Omnitrix Master",
};

const badgeIcons = {
  websiteRuiner:     "😭",
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
