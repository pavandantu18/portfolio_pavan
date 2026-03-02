import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { AchievementContext } from "../../../../context/AchievementContext";
import { ACHIEVEMENTS, OMNITRIX_QUESTIONS, OMNITRIX_ROUNDS, OMNITRIX_URGENT_MS, OMNITRIX_HINT_DELAY, WINDOW_SIZES } from "../../../../config/constants";
import MacWindow from "../../MacWindow";
import "./OmnitrixTimeout.scss";


const SVG_R    = 46;
const SVG_CIRC = 2 * Math.PI * SVG_R;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function OmnitrixTimeout({ windowName, setwindowState, zIndex, onFocus }) {
  const { unlockAchievement } = useContext(AchievementContext);

  const [phase,        setPhase]       = useState("idle"); // idle | playing | correct | wrong | roundComplete | gameOver | victory
  const [roundIdx,     setRoundIdx]    = useState(0);
  const [qIdx,         setQIdx]        = useState(0);
  const [questions,    setQuestions]   = useState([]);
  const [timeLeft,     setTimeLeft]    = useState(0);
  const [correctPick,  setCorrectPick] = useState(null);
  const [wrongPick,    setWrongPick]   = useState(null);
  const [showHint,     setShowHint]    = useState(false);
  const [locked,       setLocked]      = useState(false); // drives disabled/pointerEvents in UI

  const endTimeRef   = useRef(0);
  const totalTimeRef = useRef(0);
  const lockedRef    = useRef(false);  // always-current ref — never stale in closures
  // Single shuffled pool consumed across all rounds — no repeats
  const poolRef      = useRef([]);

  // Countdown timer — pauses on correct/wrong flash
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

  // Achievement on victory
  useEffect(() => {
    if (phase === "victory") unlockAchievement(ACHIEVEMENTS.OMNITRIX_TIMEOUT);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hint: glow the correct answer after OMNITRIX_HINT_DELAY ms of inactivity
  useEffect(() => {
    setShowHint(false);
    if (phase !== "playing") return;
    const id = setTimeout(() => setShowHint(true), OMNITRIX_HINT_DELAY);
    return () => clearTimeout(id);
  }, [qIdx, phase]);

  const beginRound = useCallback((rIdx) => {
    lockedRef.current = false;
    setLocked(false);
    const r = OMNITRIX_ROUNDS[rIdx];
    // On round 0, seed the pool with all questions shuffled once
    if (rIdx === 0) poolRef.current = shuffle([...OMNITRIX_QUESTIONS]);
    // Pull the next `r.questions` from the pool (no repeats guaranteed)
    const count  = Math.min(r.questions, poolRef.current.length);
    const picked = poolRef.current.splice(0, count);
    const mobile = window.innerWidth < 768;
    const qs = picked.map(q => {
      const choices = shuffle([q.answer, ...q.wrong]);
      if (mobile) {
        // Pin correct answer to slot B (index 1) on mobile — ghost taps just show the hint
        const idx = choices.indexOf(q.answer);
        if (idx !== 1) [choices[1], choices[idx]] = [choices[idx], choices[1]];
      }
      return { clue: q.clue, answer: q.answer, choices };
    });
    totalTimeRef.current = r.time * 1000;
    endTimeRef.current   = Date.now() + r.time * 1000;
    setQuestions(qs);
    setQIdx(0);
    setTimeLeft(r.time * 1000);
    setCorrectPick(null);
    setWrongPick(null);
    setPhase("playing");
  }, []);

  const advance = useCallback((nextQ, total, rIdx) => {
    if (nextQ >= total) {
      // MUST reset lock here — the else branch never runs, so the ref stays true otherwise
      lockedRef.current = false;
      setLocked(false);
      setPhase(rIdx >= OMNITRIX_ROUNDS.length - 1 ? "victory" : "roundComplete");
    } else {
      lockedRef.current = true;
      setLocked(true);
      setQIdx(nextQ);
      setCorrectPick(null);
      setWrongPick(null);
      setPhase("playing");
      setTimeout(() => { lockedRef.current = false; setLocked(false); }, 400);
    }
  }, []);

  const isMobile = window.innerWidth < 768;

  const handleChoice = (name) => {
    // lockedRef.current is always current even before React re-renders
    if (phase !== "playing" || correctPick || wrongPick || lockedRef.current) return;
    const q = questions[qIdx];
    if (name === q.answer) {
      lockedRef.current = true; // block immediately — before any re-render
      if (isMobile) {
        // No flash on mobile — advance instantly, ghost-tap window = 0
        setCorrectPick(name);
        advance(qIdx + 1, questions.length, roundIdx);
      } else {
        setPhase("correct");
        setCorrectPick(name);
        endTimeRef.current += 500;
        setTimeout(() => advance(qIdx + 1, questions.length, roundIdx), 500);
      }
    } else {
      setWrongPick(name);
      setPhase("wrong");
      setTimeout(() => setPhase("gameOver"), 950);
    }
  };

  const handleNextRound = () => {
    const next = roundIdx + 1;
    setRoundIdx(next);
    beginRound(next);
  };

  const reset = () => {
    lockedRef.current = false;
    setLocked(false);
    setRoundIdx(0);
    setPhase("idle");
    setQuestions([]);
    setQIdx(0);
    setTimeLeft(0);
    setCorrectPick(null);
    setWrongPick(null);
  };

  const currentQ   = questions[qIdx];
  const totalTime  = totalTimeRef.current || OMNITRIX_ROUNDS[roundIdx].time * 1000;
  const progress   = (phase === "playing" || phase === "correct") ? Math.max(0, timeLeft / totalTime) : 1;
  const dashOffset = SVG_CIRC * (1 - progress);
  const isUrgent   = phase === "playing" && timeLeft < OMNITRIX_URGENT_MS;
  const isActive   = phase === "playing" || phase === "correct" || phase === "wrong";

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus} {...WINDOW_SIZES.OMNITRIX}>
      <div className="omnitrix-timeout">

        {/* Header */}
        <div className="ot-header">
          <span className="ot-logo">🟢</span>
          <div>
            <h2 className="ot-title">Code Scan</h2>
            <p className="ot-subtitle">Omnitrix analyzing source DNA</p>
          </div>
        </div>

        {/* IDLE */}
        {phase === "idle" && (
          <div className="ot-screen ot-screen--idle">
            <div className="ot-idle-ring">
              <svg viewBox="0 0 120 120" width="120" height="120">
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

            <div className="ot-intro">
              <p className="ot-intro__headline">Can you guess the tech stack?</p>
              <p className="ot-intro__body">
                The Omnitrix is scanning this portfolio's source code.
                Each question reveals a feature try to pick the technology behind it.
                Answer before the watch times out!
              </p>
            </div>

            <ul className="ot-preview">
              {OMNITRIX_ROUNDS.map((r, i) => (
                <li key={i}>
                  <strong>Round {i + 1}</strong>
                  <span>{r.questions} questions · {r.time}s</span>
                </li>
              ))}
            </ul>
            <button className="ot-btn ot-btn--green" onClick={() => { setRoundIdx(0); beginRound(0); }}>
              Begin Scan
            </button>
          </div>
        )}

        {/* PLAYING / CORRECT / WRONG */}
        {isActive && currentQ && (
          <div className={`ot-screen ot-screen--playing${phase === "correct" ? " ot-screen--correct" : ""}${phase === "wrong" ? " ot-screen--wrong" : ""}`}>
            {/* Full-area absorber: blocks all touch/click during flash and lock window */}
            {(phase !== "playing" || locked) && (
              <div
                style={{ position: "absolute", inset: 0, zIndex: 50 }}
                onTouchStart={(e) => e.preventDefault()}
                onTouchEnd={(e) => e.preventDefault()}
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {/* Timer ring */}
            <div className={`ot-timer${isUrgent ? " urgent" : ""}`}>
              <svg viewBox="0 0 120 120" width="88" height="88">
                <circle cx="60" cy="60" r={SVG_R} className="ot-ring-track" />
                <circle cx="60" cy="60" r={SVG_R}
                  className={`ot-ring-fill${isUrgent ? " urgent" : ""}${phase === "correct" ? " correct" : ""}`}
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
                Round {roundIdx + 1}/{OMNITRIX_ROUNDS.length} · Q{qIdx + 1}/{questions.length}
              </div>
            </div>

            {/* Clue — keyed by qIdx so animation re-triggers each question */}
            <div className="ot-clue" key={`clue-${qIdx}`}>
              <span className="ot-clue__tag">SCANNING</span>
              {currentQ.clue}
            </div>

            {/* Choices — keyed by qIdx for stagger re-trigger */}
            <div className="ot-choices" key={`choices-${qIdx}`}>
              {currentQ.choices.map((name, i) => (
                <button
                  key={name}
                  className={[
                    "ot-choice",
                    `ot-choice--${i}`,
                    correctPick === name                                             ? "ot-choice--correct" : "",
                    phase === "wrong" && name === wrongPick                         ? "ot-choice--wrong"   : "",
                    phase === "wrong" && name === currentQ.answer                   ? "ot-choice--reveal"  : "",
                    showHint && !correctPick && !wrongPick && name === currentQ.answer ? "ot-choice--hint"    : "",
                  ].filter(Boolean).join(" ")}
                  onClick={(e) => { e.currentTarget.blur(); handleChoice(name); }}
                  disabled={phase !== "playing" || locked}
                >
                  <span className="ot-choice__letter">{String.fromCharCode(65 + i)}</span>
                  {name}
                </button>
              ))}
            </div>

          </div>
        )}

        {/* ROUND COMPLETE */}
        {phase === "roundComplete" && (
          <div className="ot-screen ot-screen--result">
            <div className="ot-result-emoji">✅</div>
            <h3 className="ot-result-title">Scan {roundIdx + 1} Complete!</h3>
            <p className="ot-result-sub">Omnitrix stable… Initiating deeper scan for Round {roundIdx + 2}!</p>
            <button className="ot-btn ot-btn--green" onClick={handleNextRound}>Next Round →</button>
          </div>
        )}

        {/* GAME OVER */}
        {phase === "gameOver" && (
          <div className="ot-screen ot-screen--result">
            <div className="ot-result-emoji">⏰</div>
            <h3 className="ot-result-title">Omnitrix Timed Out!</h3>
            <p className="ot-result-sub">Round {roundIdx + 1} · Q{qIdx + 1} of {OMNITRIX_ROUNDS[roundIdx].questions}</p>
            <button className="ot-btn" onClick={reset}>Try Again</button>
          </div>
        )}

        {/* VICTORY */}
        {phase === "victory" && (
          <div className="ot-screen ot-screen--result ot-screen--victory">
            <div className="ot-result-emoji">🟢</div>
            <h3 className="ot-result-title">Full Scan Complete!</h3>
            <p className="ot-result-sub">You decoded how this portfolio was built. Achievement unlocked!</p>
            <button className="ot-btn ot-btn--green" onClick={reset}>Scan Again</button>
          </div>
        )}

      </div>
    </MacWindow>
  );
}
