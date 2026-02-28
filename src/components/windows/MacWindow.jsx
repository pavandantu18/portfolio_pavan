import React, { useState, useMemo, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"

const MacWindow = ({children, windowName, setwindowState, initialWidth = 700, initialHeight = 500}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rndSize, setRndSize] = useState({
    width: initialWidth,
    height: initialHeight,
    x: 100,
    y: 100,
  });

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => setIsMaximized(v => !v);

  const handleClose = () => {
    setIsClosing(true);
  };

  // After closing animation completes, remove window from state
  useEffect(() => {
    if (!isClosing) return;
    const t = setTimeout(() => {
      setwindowState(state => ({ ...state, [windowName]: false }));
    }, 220);
    return () => clearTimeout(t);
  }, [isClosing, setwindowState, windowName]);

  const handleResize = (e, direction, ref, delta, position) => {
    setRndSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      x: position.x,
      y: position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isMaximized) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 }); // max ±8°
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleDragStop = (e, d) => {
    setRndSize(prev => ({
      ...prev,
      x: d.x,
      y: d.y,
    }));
  };

  // Calculate max dimensions accounting for dock position (bottom: 1.2rem, height ~60px total)
  const dockReservedSpace = 140; // ~120px dock + margins
  const maxHeight = useMemo(() => window.innerHeight - dockReservedSpace, []);
  const maxWidth = useMemo(() => window.innerWidth - 40, []);

  return (
    <Rnd
      default={{
        x: rndSize.x,
        y: rndSize.y,
        width: rndSize.width,
        height: isMinimized ? 34 : rndSize.height,
      }}
      minWidth={300}
      minHeight={100}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      onResize={handleResize}
      onDragStop={handleDragStop}
      enableResizing={{
        bottom: !isMinimized && !isMaximized,
        bottomLeft: !isMinimized && !isMaximized,
        bottomRight: !isMinimized && !isMaximized,
        left: !isMinimized && !isMaximized,
        right: !isMinimized && !isMaximized,
        top: !isMinimized && !isMaximized,
        topLeft: !isMinimized && !isMaximized,
        topRight: !isMinimized && !isMaximized,
      }}
      style={{ zIndex: 1000 }}
    >
      <div
        className={`window${isClosing ? ' closing' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          height: isMinimized ? '34px' : isMaximized ? maxHeight : rndSize.height,
          width: isMaximized ? maxWidth : rndSize.width,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.08s ease' : 'transform 0.5s ease',
          willChange: isHovered ? 'transform' : 'auto',
        }}
      >
        <div className="nav">
          <div className="dots">
            <div
              className="dot red"
              onClick={handleClose}
              title="Close"
            ></div>
            <div
              className="dot yellow"
              onClick={handleMinimize}
              title={isMinimized ? "Restore" : "Minimize"}
              style={{ opacity: isMinimized ? 0.6 : 1 }}
            ></div>
            <div
              className="dot green"
              onClick={handleMaximize}
              title={isMaximized ? "Restore" : "Maximize"}
              style={{ opacity: isMaximized ? 0.6 : 1 }}
            ></div>
          </div>
          <div className="title">
            <p>pavankumar - {windowName}</p>
          </div>
        </div>
        {!isMinimized && (
          <div className="main-content">
            {children}
          </div>
        )}
      </div>
    </Rnd>
  )
}

export default MacWindow