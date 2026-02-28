import { useState, useEffect, useRef, useContext } from "react";
import MacWindow from "../../MacWindow";
import { AchievementContext } from "../../../../context/AchievementContext";
import { ACHIEVEMENTS } from "../../../../config/constants";
import "./SpiderSense.scss";

const RANKS = [
  { max: 150,      label: "Spider-Sense", emoji: "⚡", color: "#ef4444", desc: "Inhuman. Are you even real?" },
  { max: 220,      label: "Web-Slinger",  emoji: "🕷️", color: "#dc2626", desc: "Legendary reflexes!" },
  { max: 300,      label: "Hero",         emoji: "🦸", color: "#3b82f6", desc: "Impressive!" },
  { max: 400,      label: "S.H.I.E.L.D.",emoji: "🛡️", color: "#6366f1", desc: "Solid agent material." },
  { max: 500,      label: "Daily Bugler", emoji: "📰", color: "#f59e0b", desc: "Not bad, Parker." },
  { max: Infinity, label: "Civilian",     emoji: "🐌", color: "#6b7280", desc: "Keep training!" },
];

function getRank(ms) {
  return RANKS.find(r => ms < r.max);
}

// phase: idle | waiting | dropped | result | false_start
export default function SpiderSense({ windowName, setwindowState }) {
  const { unlockAchievement } = useContext(AchievementContext);
  const [phase, setPhase] = useState("idle");
  const [reactionMs, setReactionMs] = useState(null);
  const [spiderX, setSpiderX] = useState(50);
  const dropTimeRef = useRef(null);
  const timerRef = useRef(null);

  const startGame = () => {
    clearTimeout(timerRef.current);
    setPhase("waiting");
    setReactionMs(null);
    const delay = 1500 + Math.random() * 2500;
    timerRef.current = setTimeout(() => {
      setSpiderX(12 + Math.random() * 76);
      dropTimeRef.current = performance.now();
      setPhase("dropped");
    }, delay);
  };

  const handleClick = () => {
    if (phase === "idle" || phase === "result" || phase === "false_start") {
      startGame();
      return;
    }
    if (phase === "waiting") {
      clearTimeout(timerRef.current);
      setPhase("false_start");
      return;
    }
    if (phase === "dropped") {
      const ms = Math.round(performance.now() - dropTimeRef.current);
      setReactionMs(ms);
      setPhase("result");
      if (ms < 300) unlockAchievement(ACHIEVEMENTS.SPIDER_SENSE);
    }
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const rank = reactionMs !== null ? getRank(reactionMs) : null;

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} initialWidth={500} initialHeight={400}>
      <div className={`spider-sense spider-sense--${phase}`} onClick={handleClick}>

        {phase === "dropped" && (
          <div className="spider-sense__web" style={{ left: `${spiderX}%` }}>
            <div className="spider-sense__strand" />
            <div className="spider-sense__spider">🕷️</div>
          </div>
        )}

        <div className="spider-sense__overlay">
          {phase === "idle" && (
            <div className="spider-sense__msg">
              <span className="spider-sense__big-emoji">🕷️</span>
              <h2 className="spider-sense__title">Spider-Sense</h2>
              <p className="spider-sense__sub">A spider will drop from the ceiling.<br />Click it the instant it appears.</p>
              <p className="spider-sense__hint">Don&apos;t click early!</p>
              <button className="spider-sense__btn">Start</button>
            </div>
          )}

          {phase === "waiting" && (
            <div className="spider-sense__msg">
              <span className="spider-sense__big-emoji spider-sense__big-emoji--pulse">👁️</span>
              <p className="spider-sense__sub">Stay focused...</p>
              <p className="spider-sense__hint">Don&apos;t click yet!</p>
            </div>
          )}

          {phase === "false_start" && (
            <div className="spider-sense__msg">
              <span className="spider-sense__big-emoji">😬</span>
              <h2 className="spider-sense__title spider-sense__title--bad">Too Early!</h2>
              <p className="spider-sense__sub">Your Spider-Sense isn&apos;t tingling yet.</p>
              <button className="spider-sense__btn">Try Again</button>
            </div>
          )}

          {phase === "result" && rank && (
            <div className="spider-sense__result">
              <span className="spider-sense__big-emoji">🕷️</span>
              <div className="spider-sense__time">
                {reactionMs}<span className="spider-sense__unit">ms</span>
              </div>
              <div className="spider-sense__rank" style={{ color: rank.color }}>
                <span className="spider-sense__rank-emoji">{rank.emoji}</span>
                <span className="spider-sense__rank-label">{rank.label}</span>
              </div>
              <p className="spider-sense__rank-desc">{rank.desc}</p>
              {reactionMs < 300 && (
                <p className="spider-sense__achievement">⚡ Achievement Unlocked!</p>
              )}
              <button className="spider-sense__btn">Again</button>
            </div>
          )}
        </div>
      </div>
    </MacWindow>
  );
}
