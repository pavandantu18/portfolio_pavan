import { useState, useEffect, useContext } from "react";
import { AchievementContext } from "../../../../context/AchievementContext";
import { ACHIEVEMENTS, MEMORY_CARD_DEFS, MEMORY_FLIP_DELAY, WINDOW_SIZES } from "../../../../config/constants";
import MacWindow from "../../MacWindow";
import "./MemoryWeb.scss";

function buildDeck() {
  return [...MEMORY_CARD_DEFS, ...MEMORY_CARD_DEFS]
    .map((card, i) => ({ ...card, uid: i }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoryWeb({ windowName, setwindowState, zIndex, onFocus }) {
  const { unlockAchievement } = useContext(AchievementContext);

  const [cards, setCards]     = useState(buildDeck);
  const [flipped, setFlipped] = useState([]);   // uids of currently face-up unmatched cards
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves]     = useState(0);
  const [locked, setLocked]   = useState(false); // prevent triple-click during flip
  const [won, setWon]         = useState(false);

  const totalPairs = MEMORY_CARD_DEFS.length;

  const handleFlip = (uid) => {
    if (locked || flipped.includes(uid) || matched.has(uid)) return;

    const next = [...flipped, uid];
    setFlipped(next);

    if (next.length < 2) return;

    setMoves(m => m + 1);
    setLocked(true);

    const [a, b] = next.map(u => cards.find(c => c.uid === u));

    if (a.id === b.id) {
      const newMatched = new Set([...matched, a.uid, b.uid]);
      setMatched(newMatched);
      setFlipped([]);
      setLocked(false);
      if (newMatched.size / 2 === totalPairs) setWon(true);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setLocked(false);
      }, MEMORY_FLIP_DELAY);
    }
  };

  useEffect(() => {
    if (won) unlockAchievement(ACHIEVEMENTS.MEMORY_MASTER);
  }, [won]);

  const reset = () => {
    setCards(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
    setWon(false);
  };

  const matchedPairs = matched.size / 2;

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus} {...WINDOW_SIZES.MEMORY_WEB}>
      <div className="memory-web">

        {/* Header */}
        <div className="memory-web__header">
          <h2 className="memory-web__title">🕸 Memory Web</h2>
          <div className="memory-web__stats">
            <span className="stat">
              <span className="stat__label">Moves</span>
              <span className="stat__val">{moves}</span>
            </span>
            <span className="stat">
              <span className="stat__label">Matched</span>
              <span className="stat__val">{matchedPairs}/{totalPairs}</span>
            </span>
          </div>
          <button className="memory-web__btn" onClick={reset}>New Game</button>
        </div>

        {/* Win banner */}
        {won && (
          <div className="memory-web__win">
            🎉 You solved it in <strong>{moves}</strong> moves!
          </div>
        )}

        {/* Grid */}
        <div className="memory-web__grid">
          {cards.map(card => {
            const isFlipped  = flipped.includes(card.uid) || matched.has(card.uid);
            const isMatched  = matched.has(card.uid);
            return (
              <div
                key={card.uid}
                className={`mem-card${isFlipped ? " flipped" : ""}${isMatched ? " matched" : ""}`}
                onClick={() => handleFlip(card.uid)}
              >
                <div className="mem-card__inner">
                  <div className="mem-card__back">🕷</div>
                  <div className="mem-card__front">
                    <span className="mem-card__emoji">{card.emoji}</span>
                    <span className="mem-card__label">{card.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </MacWindow>
  );
}
