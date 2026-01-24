import { useContext } from "react";
import { AchievementContext } from "../..//context/AchievementContext";
import "./AchievementsWindow.scss";
import MacWindow from "./MacWindow";

export default function AchievementsWindow({windowName, setwindowState}) {
    const { achievements } = useContext(AchievementContext);

    const labels = {
        websiteRuiner: "Website Ruiner",
        musicEnthusiastic: "Music Enthusiastic",
        knowMe: "Know About Me",
    };

    const icons = {
        websiteRuiner: "😭",
        musicEnthusiastic: "🎶",
        knowMe: "🔗",
    };

    const descriptions = {
        websiteRuiner: "Change the website background using the Background Game.",
        musicEnthusiastic: "Open Spotify.",
        knowMe: "Unlock by visiting my LinkedIn profile.",
    };


    return (
        <MacWindow windowName={windowName} setwindowState={setwindowState}>
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
                                <div className="icon">{icons[key]}</div>

                                <div className="info">
                                    <div className="top-row">
                                        <span className="name">{labels[key]}</span>
                                        {a.unlocked ? (
                                            <span className="status unlocked-text">Unlocked ✔</span>
                                        ) : (
                                            <span className="status locked-text">Locked</span>
                                        )}
                                    </div>

                                    <div className="description">
                                        {descriptions[key]}
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
