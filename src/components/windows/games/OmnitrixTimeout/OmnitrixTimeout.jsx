import { useState, useEffect, useRef, useContext } from "react";
import { AchievementContext } from "../../../../context/AchievementContext";
import { ACHIEVEMENTS } from "../../../../config/constants";
import MacWindow from "../../MacWindow";
import "./OmnitrixTimeout.scss";

const ROUNDS = [
  { tasks: 3, time: 14 },
  { tasks: 4, time: 12 },
  { tasks: 5, time: 10 },
];

const TYPE_WORDS = [
  "OMNITRIX", "PLUMBER", "GALVAN", "UPGRADE",
  "GHOSTFREAK", "RIPJAWS", "STINKFLY", "WILDMUTT",
  "CANNONBOLT", "OVERFLOW",
];

function makeTask(idx) {
  const isClick = idx % 2 === 0;
  if (isClick) {
    return {
      type: "click",
      x: 10 + Math.random() * 65,
      y: 10 + Math.random() * 60,
    };
  }
  const word = TYPE_WORDS[Math.floor(Math.random() * TYPE_WORDS.length)];
  return { type: "type", word };
}

const SVG_R = 46;
const SVG_CIRC = 2 * Math.PI * SVG_R;

export default function OmnitrixTimeout({ windowName, setwindowState, zIndex, onFocus }) {
  const { unlockAchievement } = useContext(AchievementContext);

  const [phase, setPhase]         = useState("idle");   // idle | playing | roundComplete | gameOver | victory
  const [roundIdx, setRoundIdx]   = useState(0);
  const [taskIdx, setTaskIdx]     = useState(0);
  const [tasks, setTasks]         = useState([]);
  const [timeLeft, setTimeLeft]   = useState(0);
  const [typeInput, setTypeInput] = useState("");
  const [inputError, setInputError] = useState(false);

  const endTimeRef   = useRef(0);
  const totalTimeRef = useRef(0);
  const inputRef     = useRef(null);

  // Countdown timer
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      const remaining = endTimeRef.current - Date.now();
      if (remaining <= 0) {
        clearInterval(id);
        setTimeLeft(0);
        setPhase("gameOver");
      } else {
        setTimeLeft(remaining);
      }
    }, 50);
    return () => clearInterval(id);
  }, [phase]);

  // Focus input on type tasks
  useEffect(() => {
    if (phase === "playing" && tasks[taskIdx]?.type === "type") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [taskIdx, phase, tasks]);

  // Achievement on victory
  useEffect(() => {
    if (phase === "victory") unlockAchievement(ACHIEVEMENTS.OMNITRIX_TIMEOUT);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const beginRound = (rIdx) => {
    const r = ROUNDS[rIdx];
    const newTasks = Array.from({ length: r.tasks }, (_, i) => makeTask(i));
    totalTimeRef.current = r.time * 1000;
    endTimeRef.current   = Date.now() + r.time * 1000;
    setTasks(newTasks);
    setTaskIdx(0);
    setTimeLeft(r.time * 1000);
    setTypeInput("");
    setInputError(false);
    setPhase("playing");
  };

  const advanceTask = () => {
    const nextIdx = taskIdx + 1;
    if (nextIdx >= tasks.length) {
      if (roundIdx >= ROUNDS.length - 1) {
        setPhase("victory");
      } else {
        setPhase("roundComplete");
      }
    } else {
      setTaskIdx(nextIdx);
      setTypeInput("");
      setInputError(false);
    }
  };

  const handleTargetClick = () => {
    if (phase !== "playing" || tasks[taskIdx]?.type !== "click") return;
    advanceTask();
  };

  const handleTypeChange = (e) => {
    const val  = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    const word = tasks[taskIdx]?.word ?? "";
    setTypeInput(val);
    setInputError(false);
    if (val === word) {
      advanceTask();
    } else if (val.length >= word.length) {
      setInputError(true);
    }
  };

  const handleNextRound = () => {
    const next = roundIdx + 1;
    setRoundIdx(next);
    beginRound(next);
  };

  const reset = () => {
    setRoundIdx(0);
    setPhase("idle");
    setTasks([]);
    setTaskIdx(0);
    setTimeLeft(0);
    setTypeInput("");
    setInputError(false);
  };

  const currentTask = tasks[taskIdx];
  const totalTime   = totalTimeRef.current || ROUNDS[roundIdx].time * 1000;
  const progress    = phase === "playing" ? Math.max(0, timeLeft / totalTime) : 1;
  const dashOffset  = SVG_CIRC * (1 - progress);
  const isUrgent    = phase === "playing" && timeLeft < 3000;

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus} initialWidth={560} initialHeight={500}>
      <div className="omnitrix-timeout">

        {/* Header */}
        <div className="ot-header">
          <span className="ot-logo">⬡</span>
          <h2 className="ot-title">Countdown to Timeout</h2>
        </div>

        {/* IDLE */}
        {phase === "idle" && (
          <div className="ot-screen">
            <div className="ot-idle-ring">
              <svg viewBox="0 0 120 120" width="130" height="130">
                <circle cx="60" cy="60" r={SVG_R} className="ot-ring-track" />
                <circle cx="60" cy="60" r={SVG_R}
                  className="ot-ring-fill ot-ring-fill--idle"
                  strokeDasharray={SVG_CIRC}
                  strokeDashoffset={0}
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="68" textAnchor="middle" className="ot-ring-icon">⬡</text>
              </svg>
            </div>
            <p className="ot-desc">Complete tasks before the Omnitrix times out!</p>
            <ul className="ot-preview">
              {ROUNDS.map((r, i) => (
                <li key={i}><strong>Round {i + 1}</strong>: {r.tasks} tasks · {r.time}s</li>
              ))}
            </ul>
            <button className="ot-btn ot-btn--green" onClick={() => { setRoundIdx(0); beginRound(0); }}>
              Activate Omnitrix
            </button>
          </div>
        )}

        {/* PLAYING */}
        {phase === "playing" && currentTask && (
          <div className="ot-screen ot-screen--playing">

            <div className={`ot-timer${isUrgent ? " urgent" : ""}`}>
              <svg viewBox="0 0 120 120" width="100" height="100">
                <circle cx="60" cy="60" r={SVG_R} className="ot-ring-track" />
                <circle cx="60" cy="60" r={SVG_R}
                  className={`ot-ring-fill${isUrgent ? " urgent" : ""}`}
                  strokeDasharray={SVG_CIRC}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dashoffset 0.05s linear" }}
                />
                <text x="60" y="67" textAnchor="middle" className="ot-ring-timer">
                  {Math.ceil(timeLeft / 1000)}
                </text>
              </svg>
              <div className="ot-progress-label">
                Round {roundIdx + 1}/{ROUNDS.length} · Task {taskIdx + 1}/{tasks.length}
              </div>
            </div>

            {currentTask.type === "click" && (
              <div className="ot-task-area">
                <p className="ot-instruction">Tap the target!</p>
                <div className="ot-arena">
                  <button
                    className="ot-target"
                    style={{ left: `${currentTask.x}%`, top: `${currentTask.y}%` }}
                    onClick={handleTargetClick}
                  />
                </div>
              </div>
            )}

            {currentTask.type === "type" && (
              <div className="ot-task-area">
                <p className="ot-instruction">Type the alien name!</p>
                <div className="ot-word">{currentTask.word}</div>
                <input
                  ref={inputRef}
                  className={`ot-input${inputError ? " error" : ""}`}
                  value={typeInput}
                  onChange={handleTypeChange}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder="TYPE HERE…"
                />
              </div>
            )}
          </div>
        )}

        {/* ROUND COMPLETE */}
        {phase === "roundComplete" && (
          <div className="ot-screen ot-screen--result">
            <div className="ot-result-emoji">✅</div>
            <h3 className="ot-result-title">Round {roundIdx + 1} Cleared!</h3>
            <p className="ot-result-sub">Omnitrix holding… Get ready for Round {roundIdx + 2}!</p>
            <button className="ot-btn ot-btn--green" onClick={handleNextRound}>Next Round →</button>
          </div>
        )}

        {/* GAME OVER */}
        {phase === "gameOver" && (
          <div className="ot-screen ot-screen--result">
            <div className="ot-result-emoji">⏰</div>
            <h3 className="ot-result-title">Omnitrix Timed Out!</h3>
            <p className="ot-result-sub">Round {roundIdx + 1} · Task {taskIdx + 1} of {ROUNDS[roundIdx].tasks}</p>
            <button className="ot-btn" onClick={reset}>Try Again</button>
          </div>
        )}

        {/* VICTORY */}
        {phase === "victory" && (
          <div className="ot-screen ot-screen--result">
            <div className="ot-result-emoji">🟢</div>
            <h3 className="ot-result-title">Omnitrix Master!</h3>
            <p className="ot-result-sub">All 3 rounds cleared before timeout. Achievement unlocked!</p>
            <button className="ot-btn ot-btn--green" onClick={reset}>Play Again</button>
          </div>
        )}

      </div>
    </MacWindow>
  );
}
