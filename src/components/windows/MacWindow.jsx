import React, { useState, useMemo, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"

const MacWindow = ({
  children,
  windowName,
  setwindowState,
  initialWidth  = 700,
  initialHeight = 500,
  zIndex        = 100,
  onFocus,
}) => {
  const [isMinimized,  setIsMinimized]  = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isMaximized,  setIsMaximized]  = useState(false);
  const [isClosing,    setIsClosing]    = useState(false);
  const [tilt,         setTilt]         = useState({ x: 0, y: 0 });
  const [isHovered,    setIsHovered]    = useState(false);
  const [rndSize,      setRndSize]      = useState({
    width: initialWidth,
    height: initialHeight,
    x: Math.max(40, (window.innerWidth  - initialWidth)  / 2),
    y: Math.max(40, (window.innerHeight - initialHeight) / 2 - 40),
  });

  const handleMinimize = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setTilt({ x: 0, y: 0 });
      setIsMinimizing(true);
    }
  };

  const handleMaximize = () => setIsMaximized(v => !v);

  const handleClose = () => setIsClosing(true);

  // Close: remove from state after animation
  useEffect(() => {
    if (!isClosing) return;
    const t = setTimeout(() => {
      setwindowState(state => ({ ...state, [windowName]: false }));
    }, 220);
    return () => clearTimeout(t);
  }, [isClosing, setwindowState, windowName]);

  const handleAnimationEnd = (e) => {
    if (e.animationName === 'win-minimize') {
      setIsMinimizing(false);
      setIsMinimized(true);
    }
  };

  const handleResize = (e, direction, ref, delta, position) => {
    setRndSize({
      width:  ref.offsetWidth,
      height: ref.offsetHeight,
      x:      position.x,
      y:      position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isMaximized || isMinimizing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x    = (e.clientX - rect.left)  / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)   / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleDragStop = (e, d) => {
    setRndSize(prev => ({ ...prev, x: d.x, y: d.y }));
  };

  const dockReservedSpace = 140;
  const maxHeight = useMemo(() => window.innerHeight - dockReservedSpace, []);
  const maxWidth  = useMemo(() => window.innerWidth  - 40, []);

  const windowTransform = (isMinimizing || isClosing)
    ? undefined
    : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

  const windowClasses = [
    'window',
    isClosing    ? 'closing'    : '',
    isMinimizing ? 'minimizing' : '',
  ].filter(Boolean).join(' ');

  return (
    <Rnd
      position={{ x: rndSize.x, y: rndSize.y }}
      size={{
        width:  rndSize.width,
        height: isMinimized ? 34 : rndSize.height,
      }}
      minWidth={300}
      minHeight={100}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      onResize={handleResize}
      onDragStop={handleDragStop}
      enableResizing={{
        bottom:      !isMinimized && !isMaximized,
        bottomLeft:  !isMinimized && !isMaximized,
        bottomRight: !isMinimized && !isMaximized,
        left:        !isMinimized && !isMaximized,
        right:       !isMinimized && !isMaximized,
        top:         !isMinimized && !isMaximized,
        topLeft:     !isMinimized && !isMaximized,
        topRight:    !isMinimized && !isMaximized,
      }}
      style={{ zIndex }}
      onMouseDown={onFocus}
    >
      <div
        className={windowClasses}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onAnimationEnd={handleAnimationEnd}
        style={{
          height:     isMinimized ? '34px' : isMaximized ? maxHeight : rndSize.height,
          width:      isMaximized ? maxWidth : rndSize.width,
          transform:  windowTransform,
          transition: isHovered ? 'transform 0.08s ease' : 'transform 0.5s ease',
          willChange: isHovered ? 'transform' : 'auto',
        }}
      >
        <div className="nav">
          <div className="dots">
            <div className="dot red"    onClick={handleClose}    title="Close" />
            <div
              className="dot yellow"
              onClick={handleMinimize}
              title={isMinimized ? 'Restore' : 'Minimize'}
              style={{ opacity: isMinimized ? 0.6 : 1 }}
            />
            <div
              className="dot green"
              onClick={handleMaximize}
              title={isMaximized ? 'Restore' : 'Maximize'}
              style={{ opacity: isMaximized ? 0.6 : 1 }}
            />
          </div>
          <div className="title">
            <p>pavankumar — {windowName}</p>
          </div>
        </div>
        {!isMinimized && !isMinimizing && (
          <div className="main-content">
            {children}
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default MacWindow;
