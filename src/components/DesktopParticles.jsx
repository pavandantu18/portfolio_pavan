import { useEffect, useRef } from 'react'

const NUM          = 65    // total web nodes
const DEPTH        = 900   // z-range: 1 → DEPTH (far)
const FOCAL        = 280   // perspective focal length
const CONNECT_PX   = 105   // max screen-dist to draw a strand
const MIN_SPEED    = 0.35
const MAX_SPEED    = 1.1
const MAX_STARS    = 5     // max simultaneous shooting stars
const MAX_RIPPLES  = 8     // max simultaneous click ripples

function rand(a, b) { return Math.random() * (b - a) + a }

function resetParticle(p) {
  p.x     = rand(-1, 1)   // normalised screen fraction
  p.y     = rand(-1, 1)
  p.z     = DEPTH
  p.speed = rand(MIN_SPEED, MAX_SPEED)
  p.vx    = rand(-0.0004, 0.0004)  // gentle lateral drift
  p.vy    = rand(-0.0004, 0.0004)
}

function spawnStar(W, H) {
  // Spawn from a random edge, aimed roughly toward center
  const side = Math.floor(Math.random() * 4)
  let sx, sy
  if (side === 0) { sx = rand(0, W); sy = 0 }
  else if (side === 1) { sx = W; sy = rand(0, H) }
  else if (side === 2) { sx = rand(0, W); sy = H }
  else                 { sx = 0; sy = rand(0, H) }

  const cx = W / 2, cy = H / 2
  const angle = Math.atan2(cy - sy, cx - sx) + rand(-0.5, 0.5)
  const spd   = rand(10, 22)
  return {
    x:       sx,
    y:       sy,
    dx:      Math.cos(angle) * spd,
    dy:      Math.sin(angle) * spd,
    len:     rand(70, 140),
    life:    0,
    maxLife: rand(45, 90),
  }
}

const DesktopParticles = () => {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: 0, y: 0 })  // both axes, -0.5 … +0.5

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W, H, cx, cy, raf

    const particles = Array.from({ length: NUM }, () => {
      const p = {}
      resetParticle(p)
      p.z = rand(1, DEPTH)
      return p
    })

    const stars   = []
    const ripples = []

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      cx = W / 2
      cy = H / 2
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth  - 0.5
      mouseRef.current.y = e.clientY / window.innerHeight - 0.5
    }
    const onMouseLeave = () => { mouseRef.current.x = 0; mouseRef.current.y = 0 }
    const onClick = (e) => {
      if (ripples.length < MAX_RIPPLES)
        ripples.push({ x: e.clientX, y: e.clientY, life: 0, maxLife: 50 })
    }
    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('click',      onClick)

    const getColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--t-primary').trim() || '#dc2626'

    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      const color = getColor()

      const steer    = mouseRef.current.x
      const speedMult = 1 + Math.abs(steer) * 2.8
      const vpx = cx - steer * W * 0.30
      const vpy = cy

      // ── Project particles ─────────────────────────────────────
      const pts = particles.map(p => {
        const scale = FOCAL / p.z
        return {
          sx: vpx + p.x * W * 0.55 * scale,
          sy: vpy + p.y * H * 0.55 * scale,
          r:  Math.max(0.4, 2.4 * scale),
          a:  Math.min(0.92, 1 - p.z / DEPTH),
        }
      })

      // ── Web strands ───────────────────────────────────────────
      ctx.strokeStyle = color
      ctx.lineWidth   = 0.6
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].sx - pts[j].sx, pts[i].sy - pts[j].sy)
          if (d < CONNECT_PX) {
            ctx.globalAlpha =
              (1 - d / CONNECT_PX) * Math.min(pts[i].a, pts[j].a) * 0.28
            ctx.beginPath()
            ctx.moveTo(pts[i].sx, pts[i].sy)
            ctx.lineTo(pts[j].sx, pts[j].sy)
            ctx.stroke()
          }
        }
      }

      // ── Node dots ─────────────────────────────────────────────
      ctx.fillStyle = color
      for (const { sx, sy, r, a } of pts) {
        ctx.globalAlpha = a * 0.7
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Shooting stars ────────────────────────────────────────
      if (stars.length < MAX_STARS && Math.random() < 0.014) {
        stars.push(spawnStar(W, H))
      }
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        const t = s.life / s.maxLife
        const spd = Math.hypot(s.dx, s.dy)
        const nx = s.dx / spd, ny = s.dy / spd
        const tailX = s.x - nx * s.len
        const tailY = s.y - ny * s.len

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        grad.addColorStop(0, `${color}00`)
        grad.addColorStop(1, color)

        ctx.globalAlpha = (1 - t) * 0.75
        ctx.strokeStyle = grad
        ctx.lineWidth   = 1.5
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()

        // Bright head dot
        ctx.globalAlpha = (1 - t) * 0.9
        ctx.fillStyle   = color
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2)
        ctx.fill()

        s.x += s.dx
        s.y += s.dy
        s.life++
        if (s.life > s.maxLife) stars.splice(i, 1)
      }

      // ── Click ripple rings ────────────────────────────────────
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        const t  = rp.life / rp.maxLife
        const r  = 140 * t

        ctx.strokeStyle = color
        ctx.lineWidth   = 1.5

        // Outer ring
        ctx.globalAlpha = (1 - t) * 0.55
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2)
        ctx.stroke()

        // Inner ring (offset)
        if (r > 25) {
          ctx.globalAlpha = (1 - t) * 0.3
          ctx.beginPath()
          ctx.arc(rp.x, rp.y, r * 0.6, 0, Math.PI * 2)
          ctx.stroke()
        }

        rp.life++
        if (rp.life > rp.maxLife) ripples.splice(i, 1)
      }

      ctx.globalAlpha = 1

      // ── Advance particles ─────────────────────────────────────
      const mx = mouseRef.current.x, my = mouseRef.current.y
      for (const p of particles) {
        p.z -= p.speed * speedMult

        // Gentle lateral drift
        p.vx += rand(-0.00006, 0.00006)
        p.vy += rand(-0.00006, 0.00006)
        p.vx  = Math.max(-0.0007, Math.min(0.0007, p.vx))
        p.vy  = Math.max(-0.0007, Math.min(0.0007, p.vy))
        p.x  += p.vx

        // Very subtle mouse attraction in normalized space
        p.x += (mx * 0.4 - p.x) * 0.0006
        p.y += (my * 0.4 - p.y) * 0.0006

        if (p.z < 1) resetParticle(p)
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('click',      onClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
        opacity:       0.55,
        transform:     'translate(var(--p3x, 0px), var(--p3y, 0px))',
        willChange:    'transform',
      }}
    />
  )
}

export default DesktopParticles
