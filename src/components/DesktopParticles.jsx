import { useEffect, useRef } from 'react'

const NUM          = 65    // total web nodes
const DEPTH        = 900   // z-range: 1 → DEPTH (far)
const FOCAL        = 280   // perspective focal length
const CONNECT_PX   = 105   // max screen-dist to draw a strand
const MIN_SPEED    = 0.35
const MAX_SPEED    = 1.1

function rand(a, b) { return Math.random() * (b - a) + a }

function resetParticle(p) {
  p.x     = rand(-1, 1)   // normalised screen fraction
  p.y     = rand(-1, 1)
  p.z     = DEPTH
  p.speed = rand(MIN_SPEED, MAX_SPEED)
}

const DesktopParticles = () => {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ nx: 0 })   // nx: -0.5 (left) … +0.5 (right)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W, H, cx, cy, raf

    // Spread initial z so nodes don't all arrive at once
    const particles = Array.from({ length: NUM }, () => {
      const p = {}
      resetParticle(p)
      p.z = rand(1, DEPTH)   // scatter on first frame
      return p
    })

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      cx = W / 2
      cy = H / 2
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouseRef.current.nx = e.clientX / window.innerWidth - 0.5  // -0.5 … +0.5
    }
    const onMouseLeave = () => {
      mouseRef.current.nx = 0
    }
    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    // Read theme primary color each frame (auto-updates on theme switch)
    const getColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--t-primary').trim() || '#dc2626'

    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      const color = getColor()

      const steer     = mouseRef.current.nx           // -0.5 … +0.5
      const speedMult = 1 + Math.abs(steer) * 2.8     // faster when turning
      // Shift vanishing point opposite to steer → steering right = vp moves left
      const vpx = cx - steer * W * 0.30
      const vpy = cy

      // Project all particles to 2-D screen coordinates
      const pts = particles.map(p => {
        const scale = FOCAL / p.z
        return {
          sx: vpx + p.x * W * 0.55 * scale,
          sy: vpy + p.y * H * 0.55 * scale,
          r:  Math.max(0.4, 2.4 * scale),
          a:  Math.min(0.92, 1 - p.z / DEPTH),   // far = transparent
        }
      })

      // ── Web strands between nearby nodes ───────────────────────
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

      // ── Node dots ──────────────────────────────────────────────
      ctx.fillStyle = color
      for (const { sx, sy, r, a } of pts) {
        ctx.globalAlpha = a * 0.7
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1

      // ── Advance toward viewer, recycle when they pass the camera ─
      for (const p of particles) {
        p.z -= p.speed * speedMult
        if (p.z < 1) resetParticle(p)
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
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
      }}
    />
  )
}

export default DesktopParticles
