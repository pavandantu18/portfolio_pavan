/* ── Shared Spider-Man character SVG illustrations ──────────────────────────
   Used by BootScreen (small) and DesktopSpider (large).
   Every shape has a rim-highlight stroke so it reads against each theme's
   dark background. Near-black fills are lifted to at least #1a range.
──────────────────────────────────────────────────────────────────────────── */

export const SPIDER_CHARS = {
  classic: {
    name: 'Peter Parker',
    sub: 'Classic Spider-Man Edition',
    svg: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Blue suit body */}
        <path d="M22 86 Q22 114 50 114 Q78 114 78 86 Q66 76 50 76 Q34 76 22 86Z" fill="#1d4ed8"/>
        {/* Body rim highlight */}
        <path d="M22 86 Q22 114 50 114 Q78 114 78 86 Q66 76 50 76 Q34 76 22 86Z"
          fill="none" stroke="#4f77e8" strokeWidth="1.2"/>
        {/* Red mask */}
        <ellipse cx="50" cy="50" rx="34" ry="40" fill="#dc2626"/>
        {/* Mask rim highlight */}
        <ellipse cx="50" cy="50" rx="34" ry="40" fill="none" stroke="#f87171" strokeWidth="1"/>
        {/* Web lines */}
        <line x1="50" y1="10" x2="50" y2="90" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <line x1="16" y1="50" x2="84" y2="50" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <path d="M19 34 Q50 20 81 34" fill="none" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <path d="M16 50 Q50 36 84 50" fill="none" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <path d="M19 66 Q50 80 81 66" fill="none" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <line x1="24" y1="16" x2="76" y2="84" stroke="#7f1d1d" strokeWidth="0.8" opacity="0.45"/>
        <line x1="76" y1="16" x2="24" y2="84" stroke="#7f1d1d" strokeWidth="0.8" opacity="0.45"/>
        {/* Classic almond eyes */}
        <path d="M16 46 Q30 28 45 40 Q30 54 16 46Z" fill="white"/>
        <path d="M55 40 Q70 28 84 46 Q70 54 55 40Z" fill="white"/>
        {/* Eye sheen */}
        <path d="M20 45 Q30 32 42 41 Q30 52 20 45Z" fill="rgba(200,230,255,0.18)"/>
        <path d="M58 41 Q70 32 80 45 Q70 52 58 41Z" fill="rgba(200,230,255,0.18)"/>
      </svg>
    ),
  },

  miles: {
    name: 'Miles Morales',
    sub: 'Into the Spider-Verse Edition',
    svg: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body — lifted from near-black */}
        <path d="M20 84 Q20 114 50 114 Q80 114 80 84 Q66 74 50 74 Q34 74 20 84Z" fill="#1a1a2e"/>
        {/* Body rim highlight */}
        <path d="M20 84 Q20 114 50 114 Q80 114 80 84 Q66 74 50 74 Q34 74 20 84Z"
          fill="none" stroke="#3030548" strokeWidth="1.2"/>
        <path d="M20 84 Q20 114 50 114 Q80 114 80 84 Q66 74 50 74 Q34 74 20 84Z"
          fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.5"/>
        {/* Red spider on chest */}
        <path d="M50 80 L54 90 L63 86 L57 96 L50 110 L43 96 L37 86 L46 90Z" fill="#f43f5e" opacity="0.9"/>
        {/* Mask — lifted from near-black */}
        <ellipse cx="50" cy="48" rx="34" ry="40" fill="#1a1a2e"/>
        {/* Purple rim stroke — stronger than before */}
        <ellipse cx="50" cy="48" rx="34" ry="40" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.75"/>
        {/* Miles' large angular eyes */}
        <path d="M11 44 Q24 24 44 38 Q24 56 11 44Z" fill="white"/>
        <path d="M56 38 Q76 24 89 44 Q76 56 56 38Z" fill="white"/>
        {/* Purple overlay in eyes */}
        <path d="M13 44 Q25 27 42 39 Q25 54 13 44Z" fill="#a855f7" opacity="0.32"/>
        <path d="M58 39 Q75 27 87 44 Q75 54 58 39Z" fill="#a855f7" opacity="0.32"/>
      </svg>
    ),
  },

  gwen: {
    name: 'Ghost-Spider',
    sub: 'Gwen Stacy Edition',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pink body */}
        <path d="M20 101 Q20 125 50 125 Q80 125 80 101 Q66 92 50 92 Q34 92 20 101Z" fill="#ec4899"/>
        {/* Body rim highlight */}
        <path d="M20 101 Q20 125 50 125 Q80 125 80 101 Q66 92 50 92 Q34 92 20 101Z"
          fill="none" stroke="#f472b6" strokeWidth="1.2"/>
        {/* Pink hood */}
        <path d="M14 62 Q12 22 50 10 Q88 22 86 62 Q72 36 50 36 Q28 36 14 62Z" fill="#ec4899"/>
        {/* Hood rim highlight */}
        <path d="M14 62 Q12 22 50 10 Q88 22 86 62 Q72 36 50 36 Q28 36 14 62Z"
          fill="none" stroke="#f472b6" strokeWidth="1.2"/>
        {/* Inner hood shadow */}
        <path d="M22 62 Q24 40 50 36 Q76 40 78 62 Q64 48 50 48 Q36 48 22 62Z" fill="#be185d" opacity="0.5"/>
        {/* White face */}
        <ellipse cx="50" cy="66" rx="30" ry="36" fill="#f8fafc"/>
        {/* Face rim — subtle cool stroke */}
        <ellipse cx="50" cy="66" rx="30" ry="36" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4"/>
        {/* Teal chin accent */}
        <path d="M28 84 Q50 100 72 84 Q62 98 50 100 Q38 98 28 84Z" fill="#06b6d4" opacity="0.28"/>
        {/* Round eyes with pink border */}
        <ellipse cx="36" cy="61" rx="11" ry="10" fill="white"/>
        <ellipse cx="64" cy="61" rx="11" ry="10" fill="white"/>
        <ellipse cx="36" cy="61" rx="11" ry="10" fill="none" stroke="#ec4899" strokeWidth="2.5"/>
        <ellipse cx="64" cy="61" rx="11" ry="10" fill="none" stroke="#ec4899" strokeWidth="2.5"/>
        {/* Eye sheen */}
        <ellipse cx="33" cy="58" rx="4" ry="3" fill="rgba(255,255,255,0.5)"/>
        <ellipse cx="61" cy="58" rx="4" ry="3" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),
  },

  noir: {
    name: 'Spider-Noir',
    sub: '1933 · New York Edition',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Trench coat — lifted from near-black so it reads against bg */}
        <path d="M15 100 Q15 128 50 128 Q85 128 85 100 Q70 88 50 88 Q30 88 15 100Z" fill="#2c3038"/>
        {/* Coat rim highlight */}
        <path d="M15 100 Q15 128 50 128 Q85 128 85 100 Q70 88 50 88 Q30 88 15 100Z"
          fill="none" stroke="#4a5060" strokeWidth="1.2"/>
        {/* Centre seam */}
        <line x1="50" y1="88" x2="50" y2="128" stroke="#4a5060" strokeWidth="1.5"/>
        {/* Lapels */}
        <path d="M50 88 L38 106 L26 108" fill="none" stroke="#5a6270" strokeWidth="2"/>
        <path d="M50 88 L62 106 L74 108" fill="none" stroke="#5a6270" strokeWidth="2"/>
        {/* Hat crown */}
        <path d="M20 32 Q20 8 50 8 Q80 8 80 32Z" fill="#282c34"/>
        {/* Hat crown rim */}
        <path d="M20 32 Q20 8 50 8 Q80 8 80 32Z" fill="none" stroke="#4a5060" strokeWidth="1"/>
        {/* Hat brim */}
        <ellipse cx="50" cy="32" rx="46" ry="10" fill="#323840"/>
        <ellipse cx="50" cy="32" rx="46" ry="10" fill="none" stroke="#5a6270" strokeWidth="1"/>
        {/* Mask */}
        <ellipse cx="50" cy="68" rx="30" ry="36" fill="#2a3040"/>
        {/* Mask rim highlight */}
        <ellipse cx="50" cy="68" rx="30" ry="36" fill="none" stroke="#4a5468" strokeWidth="1"/>
        {/* Goggle rims */}
        <circle cx="34" cy="64" r="13" fill="#1a1e28" stroke="#9ca3af" strokeWidth="2.5"/>
        <circle cx="66" cy="64" r="13" fill="#1a1e28" stroke="#9ca3af" strokeWidth="2.5"/>
        {/* Goggle lenses */}
        <circle cx="34" cy="64" r="8.5" fill="#10131c"/>
        <circle cx="66" cy="64" r="8.5" fill="#10131c"/>
        {/* Goggle glints */}
        <circle cx="30" cy="60" r="2.5" fill="#9ca3af" opacity="0.8"/>
        <circle cx="62" cy="60" r="2.5" fill="#9ca3af" opacity="0.8"/>
        {/* Bridge */}
        <rect x="47" y="62" width="6" height="4" rx="2" fill="#9ca3af"/>
      </svg>
    ),
  },

  scarlet: {
    name: 'Scarlet Spider',
    sub: 'Ben Reilly Edition',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hoodie body — lifted from near-black */}
        <path d="M12 80 Q12 128 50 128 Q88 128 88 80 Q72 66 50 66 Q28 66 12 80Z" fill="#2c1212"/>
        {/* Hoodie rim highlight */}
        <path d="M12 80 Q12 128 50 128 Q88 128 88 80 Q72 66 50 66 Q28 66 12 80Z"
          fill="none" stroke="#5a2828" strokeWidth="1.2"/>
        {/* Blue chest stripe */}
        <path d="M26 90 L28 80 Q50 72 72 80 L74 90 Q50 84 26 90Z" fill="#0580c0" opacity="0.9"/>
        {/* Stripe rim */}
        <path d="M26 90 L28 80 Q50 72 72 80 L74 90 Q50 84 26 90Z"
          fill="none" stroke="#38a8e0" strokeWidth="0.8" opacity="0.7"/>
        {/* Drawstrings — lifted so visible */}
        <path d="M50 66 Q43 74 40 92" fill="none" stroke="#5a2222" strokeWidth="2"/>
        <path d="M50 66 Q57 74 60 92" fill="none" stroke="#5a2222" strokeWidth="2"/>
        {/* Red mask */}
        <ellipse cx="50" cy="48" rx="34" ry="40" fill="#e02020"/>
        {/* Mask rim highlight */}
        <ellipse cx="50" cy="48" rx="34" ry="40" fill="none" stroke="#f87171" strokeWidth="1"/>
        {/* Elongated eyes */}
        <path d="M15 44 Q27 26 43 38 Q27 54 15 44Z" fill="white"/>
        <path d="M57 38 Q73 26 85 44 Q73 54 57 38Z" fill="white"/>
        {/* Eye sheen */}
        <path d="M18 44 Q28 30 41 39 Q28 52 18 44Z" fill="rgba(200,230,255,0.18)"/>
        <path d="M59 39 Q72 30 82 44 Q72 52 59 39Z" fill="rgba(200,230,255,0.18)"/>
        {/* Spider on hoodie */}
        <path d="M50 106 L53 113 L60 110 L55 117 L50 125 L45 117 L40 110 L47 113Z" fill="#e02020" opacity="0.65"/>
      </svg>
    ),
  },
}
