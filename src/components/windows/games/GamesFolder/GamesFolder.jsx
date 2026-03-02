import MacWindow from "../../MacWindow";
import { GAMES_LIST, WINDOW_SIZES } from "../../../../config/constants";
import "./GamesFolder.scss";

export default function GamesFolder({ windowName, setwindowState, zIndex, onFocus }) {
  const openGame = (key) => {
    setwindowState(state => ({ ...state, [key]: true }));
  };

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus} {...WINDOW_SIZES.GAMES_FOLDER}>
      <div className="games-folder">
        {GAMES_LIST.map(game => (
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
