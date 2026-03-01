import React, { useState, useEffect, useRef } from 'react'
import './DateTime.scss'

const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']

function buildGrid(year, month) {
  const firstDay  = new Date(year, month, 1).getDay()   // 0-6
  const daysInMo  = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMo; d++) cells.push(d)
  return cells
}

const DateTime = () => {
  const [now,      setNow]      = useState(new Date())
  const [open,     setOpen]     = useState(false)
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth,setViewMonth]= useState(now.getMonth())
  const ref = useRef(null)

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const todayY = now.getFullYear()
  const todayM = now.getMonth()
  const todayD = now.getDate()
  const grid   = buildGrid(viewYear, viewMonth)

  const hours   = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const ampm    = hours >= 12 ? 'PM' : 'AM'
  const h12     = hours % 12 || 12
  const label   = `${DAYS[now.getDay()]} ${MONTHS[now.getMonth()].slice(0,3)} ${now.getDate()}  ${h12}:${minutes} ${ampm}`

  return (
    <div className="dt-root" ref={ref}>
      <div
        className={`datetime-container dt-trigger${open ? ' dt-trigger--active' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Open calendar"
      >
        {label}
      </div>

      {open && (
        <div className="cal-popup">
          {/* Month navigation */}
          <div className="cal-header">
            <button className="cal-nav" onClick={prevMonth} aria-label="Previous month">‹</button>
            <span className="cal-month-label">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button className="cal-nav" onClick={nextMonth} aria-label="Next month">›</button>
          </div>

          {/* Weekday labels */}
          <div className="cal-grid">
            {DAYS.map(d => (
              <div key={d} className="cal-cell cal-cell--head">{d.slice(0,2)}</div>
            ))}

            {/* Day cells */}
            {grid.map((day, i) => {
              const isToday = day && viewYear === todayY && viewMonth === todayM && day === todayD
              const isSun   = (i % 7 === 0)
              const isSat   = (i % 7 === 6)
              return (
                <div
                  key={i}
                  className={[
                    'cal-cell',
                    day        ? 'cal-cell--day'    : 'cal-cell--empty',
                    isToday    ? 'cal-cell--today'  : '',
                    (isSun || isSat) ? 'cal-cell--weekend' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {day ?? ''}
                </div>
              )
            })}
          </div>

          {/* Footer — jump to today */}
          {(viewYear !== todayY || viewMonth !== todayM) && (
            <div className="cal-footer">
              <button
                className="cal-today-btn"
                onClick={() => { setViewYear(todayY); setViewMonth(todayM) }}
              >
                Today
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DateTime
