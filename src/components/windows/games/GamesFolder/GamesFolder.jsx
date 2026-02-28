import MacWindow from "../../MacWindow";
import "./GamesFolder.scss";

const GAMES = [
  {
    key: "color",
    emoji: "🎨",
    name: "Background Changer",
    desc: "Ruin the website",
  },
  {
    key: "memory",
    emoji: "🕸",
    name: "Memory Web",
    desc: "Match the cards",
  },
  {
    key: "spiderType",
    emoji: "⌨️",
    name: "Spider-Type",
    desc: "Type to test speed",
  },
  {
    key: "spiderSense",
    emoji: "⚡",
    name: "Spider-Sense",
    desc: "Test your reaction time",
  },
];

export default function GamesFolder({ windowName, setwindowState }) {
  const openGame = (key) => {
    setwindowState(state => ({ ...state, [key]: true }));
  };

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} initialWidth={660} initialHeight={260}>
      <div className="games-folder">
        {GAMES.map(game => (
          <button
            key={game.key}
            className="game-tile"
            onClick={() => openGame(game.key)}
            title={game.desc}
          >
            <div className="game-tile__icon">{game.emoji}</div>
            <span className="game-tile__name">{game.name}</span>
          </button>
        ))}
      </div>
    </MacWindow>
  );
}
