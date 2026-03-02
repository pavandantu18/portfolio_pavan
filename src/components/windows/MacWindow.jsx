import React, { useState, useMemo, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { PERSONAL_INFO } from '../../config/constants'
import "./MacWindow.scss"

const MacWindow = ({
  children,
  windowName,
  setwindowState,
  initialWidth  = 700,
  initialHeight = 500,
  minWidth      = 480,
  minHeight     = 320,
  zIndex        = 100,
  onFocus,
}) => {
  const [isMinimized,  setIsMinimized]  = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isMaximized,  setIsMaximized]  = useState(false);
  const [isClosing,    setIsClosing]    = useState(false);
  const [tilt,         setTilt]         = useState({ x: 0, y: 0 });
  const [isHovered,    setIsHovered]    = useState(false);
  // Cap initial size so the window never opens beyond the viewport bounds
  const safeW = Math.min(initialWidth,  window.innerWidth  - 80);
  const safeH = Math.min(initialHeight, window.innerHeight - 120);
  const [rndSize,      setRndSize]      = useState({
    width:  safeW,
    height: safeH,
    x: Math.max(40, (window.innerWidth  - safeW) / 2),
    y: Math.max(40, (window.innerHeight - safeH) / 2 - 40),
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

  // Bring to front on mount so new windows always open on top
  useEffect(() => { onFocus?.(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    setIsMaximized(false);
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
    if (isMaximized) {
      // Exit maximize but keep the current visual size instead of reverting to pre-maximize size
      setIsMaximized(false);
      setRndSize({ width: maxWidth, height: maxHeight, x: d.x, y: d.y });
    } else {
      setRndSize(prev => ({ ...prev, x: d.x, y: d.y }));
    }
  };

  const NAV_H  = 34;   // navbar height
  const DOCK_H = 110;  // dock + padding
  const PAD    = 22;   // breathing room below navbar

  const maxWidth  = useMemo(() => Math.max(Math.round(window.innerWidth  * 0.83), minWidth),  [minWidth]);
  const maxHeight = useMemo(() => Math.max(window.innerHeight - NAV_H - PAD - DOCK_H, minHeight), [minHeight]);
  const maxX      = useMemo(() => Math.max(0, Math.round((window.innerWidth - Math.max(Math.round(window.innerWidth * 0.83), minWidth)) / 2)), [minWidth]);
  const maxY      = NAV_H + PAD;

  // ── Mobile: render as a bottom sheet instead of a floating window ────────────
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    return (
      <div
        className={`mob-backdrop${isClosing ? ' mob-backdrop--closing' : ''}`}
        style={{ zIndex }}
        onMouseDown={onFocus}
      >
        <div className={`mob-sheet${isClosing ? ' mob-sheet--closing' : ''}`}>
          <div className="mob-sheet__nav">
            <button className="mob-sheet__close" onClick={handleClose}>✕</button>
            <span className="mob-sheet__title">{windowName}</span>
            <div style={{ width: 28 }} />
          </div>
          <div className="mob-sheet__content">
            {children}
          </div>
        </div>
      </div>
    );
  }

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
      position={{ x: isMaximized ? maxX : rndSize.x, y: isMaximized ? maxY : rndSize.y }}
      size={{
        width:  isMaximized ? maxWidth  : rndSize.width,
        height: isMinimized ? 34 : isMaximized ? maxHeight : rndSize.height,
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      bounds="window"
      onResize={handleResize}
      onDragStop={handleDragStop}
      enableResizing={{
        bottom:      !isMinimized,
        bottomLeft:  !isMinimized,
        bottomRight: !isMinimized,
        left:        !isMinimized,
        right:       !isMinimized,
        top:         !isMinimized,
        topLeft:     !isMinimized,
        topRight:    !isMinimized,
      }}
      style={{ zIndex }}
    >
      <div
        className={windowClasses}
        onMouseDown={onFocus}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onAnimationEnd={handleAnimationEnd}
        style={{
          height:     isMinimized ? '34px' : isMaximized ? maxHeight : rndSize.height,
          width:      isMaximized ? maxWidth  : rndSize.width,
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
            <p>{PERSONAL_INFO.USERNAME} — {windowName}</p>
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
