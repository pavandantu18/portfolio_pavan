import React from "react";
import "./SpiderWeb3D.scss";

const SPOKES = 8;
const RINGS = [28, 56, 84, 112, 140, 168, 196];
const CENTER = 220;

const pt = (r, i) => {
  const angle = (i * 2 * Math.PI) / SPOKES - Math.PI / 2;
  return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) };
};

const ringPath = (r) => {
  const pts = Array.from({ length: SPOKES }, (_, i) => pt(r, i));
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";
};

const spokePath = (i) => {
  const end = pt(RINGS[RINGS.length - 1], i);
  return `M${CENTER},${CENTER} L${end.x.toFixed(2)},${end.y.toFixed(2)}`;
};

const SpiderWeb3D = () => (
  <div className="spiderweb-3d" aria-hidden="true">
    <svg viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="webGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(220,38,38,0.6)" />
          <stop offset="60%"  stopColor="rgba(220,38,38,0.2)" />
          <stop offset="100%" stopColor="rgba(29,78,216,0.1)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Spokes */}
      {Array.from({ length: SPOKES }, (_, i) => (
        <path key={`s${i}`} d={spokePath(i)} className="spoke" />
      ))}

      {/* Rings — outermost slightly brighter for depth */}
      {RINGS.map((r, i) => (
        <path key={`r${i}`} d={ringPath(r)} className="ring" style={{ opacity: 0.4 + i * 0.09 }} />
      ))}

      {/* Centre dot */}
      <circle cx={CENTER} cy={CENTER} r={4} className="centre" />

      {/* Subtle glow fill */}
      <circle cx={CENTER} cy={CENTER} r={RINGS[RINGS.length - 1]} className="glow-fill" />
    </svg>
  </div>
);

export default SpiderWeb3D;
