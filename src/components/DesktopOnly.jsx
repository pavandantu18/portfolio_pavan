import { useEffect, useState, lazy, Suspense } from "react";
import "./desktopOnly.css";

const MobileLayout = lazy(() => import("./MobileLayout"));

function getBreakpoint() {
  const w = window.innerWidth;
  if (w < 768)  return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

const DesktopOnly = ({ children }) => {
  const [bp, setBp] = useState(getBreakpoint);

  useEffect(() => {
    document.body.dataset.screen = bp;
  }, [bp]);

  useEffect(() => {
    const update = () => setBp(getBreakpoint());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (bp === "mobile") {
    return (
      <Suspense fallback={null}>
        <MobileLayout />
      </Suspense>
    );
  }

  return children;
};

export default DesktopOnly;
