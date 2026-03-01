import { useEffect, useRef } from 'react';

const TRAIL_MS = 550;
const MAX_PTS  = 45;

export default function WebCursorTrail() {
  const canvasRef = useRef(null);
  const pts       = useRef([]);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      pts.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
      if (pts.current.length > MAX_PTS) pts.current.shift();
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      const now = Date.now();
      pts.current = pts.current.filter(p => now - p.t < TRAIL_MS);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pts.current.length >= 2) {
        const color = getComputedStyle(document.documentElement)
          .getPropertyValue('--t-primary').trim() || '#dc2626';

        // Main web strand
        for (let i = 1; i < pts.current.length; i++) {
          const p0  = pts.current[i - 1];
          const p1  = pts.current[i];
          const age = Math.max((now - p0.t) / TRAIL_MS, (now - p1.t) / TRAIL_MS);

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - age) * 0.65;
          ctx.lineWidth   = (1 - age) * 1.8;
          ctx.lineCap     = 'round';
          ctx.stroke();
        }

        // Short side-strand branches every few points (web texture)
        for (let i = 5; i < pts.current.length; i += 5) {
          const p   = pts.current[i];
          const age = (now - p.t) / TRAIL_MS;
          const len = 10 * (1 - age);
          const ang = (i * 1.9) % (Math.PI * 2);

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + len * Math.cos(ang), p.y + len * Math.sin(ang));
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - age) * 0.22;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}
