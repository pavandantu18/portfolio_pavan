import { useState, useEffect } from 'react';
import './DesktopClock.scss';

export default function DesktopClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const date = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month:   'short',
    day:     'numeric',
  });

  return (
    <div className="desktop-clock">
      <div className="desktop-clock__time">{time}</div>
      <div className="desktop-clock__date">{date}</div>
    </div>
  );
}
