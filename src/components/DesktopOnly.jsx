import { useEffect, useState } from "react";
import "./desktopOnly.css";

const DesktopOnly = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    return (
      <div className="desktop-only">
        <div className="desktop-card">
          <div className="icon">🕷️</div>
          <h1>Desktop Experience Only</h1>
          <p>
            This portfolio is designed for desktop screens.
          </p>
          <p className="hint">
            Open on a laptop or desktop for the full Spider-Verse experience.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default DesktopOnly;
