import { useContext } from "react";
import { AchievementContext } from "../../context/AchievementContext";
import { ACHIEVEMENT_LABELS, ACHIEVEMENT_ICONS, ACHIEVEMENT_DESCRIPTIONS } from "../../config/constants";
import "./AchievementsWindow.scss";
import MacWindow from "./MacWindow";

export default function AchievementsWindow({windowName, setwindowState, zIndex, onFocus}) {
    const { achievements } = useContext(AchievementContext);


    return (
        <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus}>
            <div className="achieve-window">
                <h2>🏆 Earn Achievements by exploring my portfolio</h2>

                <div className="achieve-list">
                    {Object.keys(achievements).map((key) => {
                        const a = achievements[key];  // ✅ THIS FIXES THE ERROR

                        return (
                            <div
                                key={key}
                                className={`achieve-item ${a.unlocked ? "unlocked" : ""}`}
                            >
                                <div className="icon">{ACHIEVEMENT_ICONS[key]}</div>

                                <div className="info">
                                    <div className="top-row">
                                        <span className="name">{ACHIEVEMENT_LABELS[key]}</span>
                                        {a.unlocked ? (
                                            <span className="status unlocked-text">Unlocked ✔</span>
                                        ) : (
                                            <span className="status locked-text">Locked</span>
                                        )}
                                    </div>

                                    <div className="description">
                                        {ACHIEVEMENT_DESCRIPTIONS[key]}
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
