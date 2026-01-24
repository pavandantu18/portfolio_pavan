import { createContext, useEffect, useState } from "react";

export const AchievementContext = createContext();

const defaultAchievements = {
  websiteRuiner: { unlocked: false, timestamp: null },
  musicEnthusiastic: { unlocked: false, timestamp: null },
  knowMe: { unlocked: false, timestamp: null },
};

export function AchievementProvider({ children }) {
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem("pavanAchieve");
    return saved ? JSON.parse(saved) : defaultAchievements;
  });

  const [popup, setPopup] = useState({ type: null, id: 0 });

  useEffect(() => {
    localStorage.setItem("pavanAchieve", JSON.stringify(achievements));
  }, [achievements]);

  const triggerPopup = (type) => {
    setPopup({ type, id: Date.now() });

    setTimeout(() => {
      setPopup({ type: null, id: 0 });
    }, 3500);
  };


  function unlockAchievement(key) {
    setAchievements(prev => {
      if (prev[key]?.unlocked) return prev;

      triggerPopup(key);

      return {
        ...prev,
        [key]: {
          unlocked: true,
          timestamp: new Date().toISOString(),
        },
      };
    });
  }

  return (
    <AchievementContext.Provider value={{ achievements, unlockAchievement, popup }}>
      {children}
    </AchievementContext.Provider>
  );
}
