import { useState, useRef, useEffect, useContext } from "react";
import { AchievementContext } from "../../../../context/AchievementContext";
import { ACHIEVEMENTS, SPIDER_TYPE_SENTENCES, SPIDER_TYPE_RANKS, SPIDER_TYPE_WPM_THRESHOLD, WINDOW_SIZES } from "../../../../config/constants";
import MacWindow from "../../MacWindow";
import "./SpiderType.scss";

const getRank = (wpm) => SPIDER_TYPE_RANKS.find(r => wpm >= r.min);

export default function SpiderType({ windowName, setwindowState, zIndex, onFocus }) {
  const { unlockAchievement } = useContext(AchievementContext);

  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [userInput, setUserInput]     = useState("");
  const [status, setStatus]           = useState("idle"); // idle | typing | done
  const [wpm, setWpm]                 = useState(0);
  const [accuracy, setAccuracy]       = useState(100);

  const startTimeRef = useRef(null);
  const inputRef     = useRef(null);

  const sentence = SPIDER_TYPE_SENTENCES[sentenceIdx];

  useEffect(() => {
    inputRef.current?.focus();
  }, [sentenceIdx]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length > sentence.length) return;

    if (status === "idle" && val.length > 0) {
      setStatus("typing");
      startTimeRef.current = Date.now();
    }

    setUserInput(val);

    if (val.length === sentence.length) {
      const elapsed   = (Date.now() - startTimeRef.current) / 60000; // minutes
      const calcWpm   = Math.round((sentence.length / 5) / elapsed);
      const correct   = [...val].filter((c, i) => c === sentence[i]).length;
      const calcAcc   = Math.round((correct / sentence.length) * 100);

      setWpm(calcWpm);
      setAccuracy(calcAcc);
      setStatus("done");

      if (calcWpm >= SPIDER_TYPE_WPM_THRESHOLD) unlockAchievement(ACHIEVEMENTS.SPEED_TYPIST);
    }
  };

  const reset = () => {
    setSentenceIdx(i => (i + 1) % SPIDER_TYPE_SENTENCES.length);
    setUserInput("");
    setStatus("idle");
    setWpm(0);
    setAccuracy(100);
    startTimeRef.current = null;
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  const rank = getRank(wpm);

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus} {...WINDOW_SIZES.SPIDER_TYPE}>
      <div className="spider-type" onClick={() => inputRef.current?.focus()}>

        {/* Header */}
        <div className="spider-type__header">
          <h2 className="spider-type__title">⌨️ Spider-Type</h2>
          <button className="spider-type__btn" onClick={reset}>New Sentence</button>
        </div>

        {/* Text display */}
        <div className="spider-type__display">
          {sentence.split("").map((char, i) => {
            let cls = "schar";
            if (i < userInput.length) {
              cls += userInput[i] === char ? " schar--ok" : " schar--bad";
            } else if (i === userInput.length && status !== "done") {
              cls += " schar--cursor";
            }
            return (
              <span key={i} className={cls}>
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Input */}
        {status !== "done" && (
          <div className="spider-type__input-row">
            <input
              ref={inputRef}
              className="spider-type__input"
              value={userInput}
              onChange={handleChange}
              placeholder={status === "idle" ? "Click here and start typing…" : ""}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        )}

        {/* Results */}
        {status === "done" && (
          <div className="spider-type__results">
            <div className="spider-type__stat">
              <span className="spider-type__stat-val">{wpm}</span>
              <span className="spider-type__stat-label">WPM</span>
            </div>
            <div className="spider-type__divider" />
            <div className="spider-type__stat">
              <span className="spider-type__stat-val">{accuracy}%</span>
              <span className="spider-type__stat-label">Accuracy</span>
            </div>
            <div className="spider-type__divider" />
            <div className="spider-type__rank" style={{ color: rank.color }}>
              <span className="spider-type__rank-emoji">{rank.emoji}</span>
              <span className="spider-type__rank-label">{rank.label}</span>
            </div>
            <button className="spider-type__btn spider-type__btn--next" onClick={reset}>
              Next →
            </button>
          </div>
        )}

        {/* Progress bar */}
        <div className="spider-type__progress">
          <div
            className="spider-type__progress-fill"
            style={{ width: `${(userInput.length / sentence.length) * 100}%` }}
          />
        </div>

      </div>
    </MacWindow>
  );
}
