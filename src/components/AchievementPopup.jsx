import "./AchievementPopup.scss";

const badgeLabels = {
  websiteRuiner: "Website Ruiner",
  musicEnthusiastic: "Music Enthusiastic",
  knowMe: "Know About Me",
};

const badgeIcons = {
  websiteRuiner: "😭",
  musicEnthusiastic: "🎶",
  knowMe: "🔗",
};

export default function AchievementPopup({ type }) {
  if (!type) return null;

  return (
    <div className="achievement-popup">
      <div className="popup-inner">
        <span className="emoji">{badgeIcons[type]}</span>
        <span className="text">{badgeLabels[type]} Unlocked!</span>
      </div>
    </div>
  );
}
