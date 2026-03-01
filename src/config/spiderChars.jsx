/* ── Character SVG illustrations ──────────────────────────────────────────────
   Used by BootScreen (small) and DesktopSpider (large).
   Groups: spiderman · pokemon · ben10
   Every shape has a rim-highlight stroke so it reads against each theme's
   dark background. Near-black fills are lifted to at least #1a range.
────────────────────────────────────────────────────────────────────────────── */

export const SPIDER_CHARS = {

  // ╔══════════════════════════════════════╗
  // ║         SPIDER-MAN  UNIVERSE         ║
  // ╚══════════════════════════════════════╝

  classic: {
    name: 'Peter Parker',
    sub:  'Classic Spider-Man',
    svg: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 86 Q22 114 50 114 Q78 114 78 86 Q66 76 50 76 Q34 76 22 86Z" fill="#1d4ed8"/>
        <path d="M22 86 Q22 114 50 114 Q78 114 78 86 Q66 76 50 76 Q34 76 22 86Z"
          fill="none" stroke="#4f77e8" strokeWidth="1.2"/>
        <ellipse cx="50" cy="50" rx="34" ry="40" fill="#dc2626"/>
        <ellipse cx="50" cy="50" rx="34" ry="40" fill="none" stroke="#f87171" strokeWidth="1"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <line x1="16" y1="50" x2="84" y2="50" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <path d="M19 34 Q50 20 81 34" fill="none" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <path d="M16 50 Q50 36 84 50" fill="none" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <path d="M19 66 Q50 80 81 66" fill="none" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.65"/>
        <line x1="24" y1="16" x2="76" y2="84" stroke="#7f1d1d" strokeWidth="0.8" opacity="0.45"/>
        <line x1="76" y1="16" x2="24" y2="84" stroke="#7f1d1d" strokeWidth="0.8" opacity="0.45"/>
        <path d="M16 46 Q30 28 45 40 Q30 54 16 46Z" fill="white"/>
        <path d="M55 40 Q70 28 84 46 Q70 54 55 40Z" fill="white"/>
        <path d="M20 45 Q30 32 42 41 Q30 52 20 45Z" fill="rgba(200,230,255,0.18)"/>
        <path d="M58 41 Q70 32 80 45 Q70 52 58 41Z" fill="rgba(200,230,255,0.18)"/>
      </svg>
    ),
  },

  miles: {
    name: 'Miles Morales',
    sub:  'Spider-Man · Into the Spider-Verse',
    svg: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 84 Q20 114 50 114 Q80 114 80 84 Q66 74 50 74 Q34 74 20 84Z" fill="#1a1a2e"/>
        <path d="M20 84 Q20 114 50 114 Q80 114 80 84 Q66 74 50 74 Q34 74 20 84Z"
          fill="none" stroke="#303054" strokeWidth="1.2"/>
        <path d="M20 84 Q20 114 50 114 Q80 114 80 84 Q66 74 50 74 Q34 74 20 84Z"
          fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.5"/>
        <path d="M50 80 L54 90 L63 86 L57 96 L50 110 L43 96 L37 86 L46 90Z" fill="#f43f5e" opacity="0.9"/>
        <ellipse cx="50" cy="48" rx="34" ry="40" fill="#1a1a2e"/>
        <ellipse cx="50" cy="48" rx="34" ry="40" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.75"/>
        <path d="M11 44 Q24 24 44 38 Q24 56 11 44Z" fill="white"/>
        <path d="M56 38 Q76 24 89 44 Q76 56 56 38Z" fill="white"/>
        <path d="M13 44 Q25 27 42 39 Q25 54 13 44Z" fill="#a855f7" opacity="0.32"/>
        <path d="M58 39 Q75 27 87 44 Q75 54 58 39Z" fill="#a855f7" opacity="0.32"/>
      </svg>
    ),
  },

  gwen: {
    name: 'Ghost-Spider',
    sub:  'Gwen Stacy · Earth-65',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 101 Q20 125 50 125 Q80 125 80 101 Q66 92 50 92 Q34 92 20 101Z" fill="#ec4899"/>
        <path d="M20 101 Q20 125 50 125 Q80 125 80 101 Q66 92 50 92 Q34 92 20 101Z"
          fill="none" stroke="#f472b6" strokeWidth="1.2"/>
        <path d="M14 62 Q12 22 50 10 Q88 22 86 62 Q72 36 50 36 Q28 36 14 62Z" fill="#ec4899"/>
        <path d="M14 62 Q12 22 50 10 Q88 22 86 62 Q72 36 50 36 Q28 36 14 62Z"
          fill="none" stroke="#f472b6" strokeWidth="1.2"/>
        <path d="M22 62 Q24 40 50 36 Q76 40 78 62 Q64 48 50 48 Q36 48 22 62Z" fill="#be185d" opacity="0.5"/>
        <ellipse cx="50" cy="66" rx="30" ry="36" fill="#f8fafc"/>
        <ellipse cx="50" cy="66" rx="30" ry="36" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4"/>
        <path d="M28 84 Q50 100 72 84 Q62 98 50 100 Q38 98 28 84Z" fill="#06b6d4" opacity="0.28"/>
        <ellipse cx="36" cy="61" rx="11" ry="10" fill="white"/>
        <ellipse cx="64" cy="61" rx="11" ry="10" fill="white"/>
        <ellipse cx="36" cy="61" rx="11" ry="10" fill="none" stroke="#ec4899" strokeWidth="2.5"/>
        <ellipse cx="64" cy="61" rx="11" ry="10" fill="none" stroke="#ec4899" strokeWidth="2.5"/>
        <ellipse cx="33" cy="58" rx="4" ry="3" fill="rgba(255,255,255,0.5)"/>
        <ellipse cx="61" cy="58" rx="4" ry="3" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),
  },

  noir: {
    name: 'Spider-Noir',
    sub:  'New York · 1933',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 100 Q15 128 50 128 Q85 128 85 100 Q70 88 50 88 Q30 88 15 100Z" fill="#2c3038"/>
        <path d="M15 100 Q15 128 50 128 Q85 128 85 100 Q70 88 50 88 Q30 88 15 100Z"
          fill="none" stroke="#4a5060" strokeWidth="1.2"/>
        <line x1="50" y1="88" x2="50" y2="128" stroke="#4a5060" strokeWidth="1.5"/>
        <path d="M50 88 L38 106 L26 108" fill="none" stroke="#5a6270" strokeWidth="2"/>
        <path d="M50 88 L62 106 L74 108" fill="none" stroke="#5a6270" strokeWidth="2"/>
        <path d="M20 32 Q20 8 50 8 Q80 8 80 32Z" fill="#282c34"/>
        <path d="M20 32 Q20 8 50 8 Q80 8 80 32Z" fill="none" stroke="#4a5060" strokeWidth="1"/>
        <ellipse cx="50" cy="32" rx="46" ry="10" fill="#323840"/>
        <ellipse cx="50" cy="32" rx="46" ry="10" fill="none" stroke="#5a6270" strokeWidth="1"/>
        <ellipse cx="50" cy="68" rx="30" ry="36" fill="#2a3040"/>
        <ellipse cx="50" cy="68" rx="30" ry="36" fill="none" stroke="#4a5468" strokeWidth="1"/>
        <circle cx="34" cy="64" r="13" fill="#1a1e28" stroke="#9ca3af" strokeWidth="2.5"/>
        <circle cx="66" cy="64" r="13" fill="#1a1e28" stroke="#9ca3af" strokeWidth="2.5"/>
        <circle cx="34" cy="64" r="8.5" fill="#10131c"/>
        <circle cx="66" cy="64" r="8.5" fill="#10131c"/>
        <circle cx="30" cy="60" r="2.5" fill="#9ca3af" opacity="0.8"/>
        <circle cx="62" cy="60" r="2.5" fill="#9ca3af" opacity="0.8"/>
        <rect x="47" y="62" width="6" height="4" rx="2" fill="#9ca3af"/>
      </svg>
    ),
  },

  scarlet: {
    name: 'Scarlet Spider',
    sub:  'Ben Reilly · Clone Saga',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 80 Q12 128 50 128 Q88 128 88 80 Q72 66 50 66 Q28 66 12 80Z" fill="#2c1212"/>
        <path d="M12 80 Q12 128 50 128 Q88 128 88 80 Q72 66 50 66 Q28 66 12 80Z"
          fill="none" stroke="#5a2828" strokeWidth="1.2"/>
        <path d="M26 90 L28 80 Q50 72 72 80 L74 90 Q50 84 26 90Z" fill="#0580c0" opacity="0.9"/>
        <path d="M26 90 L28 80 Q50 72 72 80 L74 90 Q50 84 26 90Z"
          fill="none" stroke="#38a8e0" strokeWidth="0.8" opacity="0.7"/>
        <path d="M50 66 Q43 74 40 92" fill="none" stroke="#5a2222" strokeWidth="2"/>
        <path d="M50 66 Q57 74 60 92" fill="none" stroke="#5a2222" strokeWidth="2"/>
        <ellipse cx="50" cy="48" rx="34" ry="40" fill="#e02020"/>
        <ellipse cx="50" cy="48" rx="34" ry="40" fill="none" stroke="#f87171" strokeWidth="1"/>
        <path d="M15 44 Q27 26 43 38 Q27 54 15 44Z" fill="white"/>
        <path d="M57 38 Q73 26 85 44 Q73 54 57 38Z" fill="white"/>
        <path d="M18 44 Q28 30 41 39 Q28 52 18 44Z" fill="rgba(200,230,255,0.18)"/>
        <path d="M59 39 Q72 30 82 44 Q72 52 59 39Z" fill="rgba(200,230,255,0.18)"/>
        <path d="M50 106 L53 113 L60 110 L55 117 L50 125 L45 117 L40 110 L47 113Z" fill="#e02020" opacity="0.65"/>
      </svg>
    ),
  },

  // ╔══════════════════════════════════════╗
  // ║           POKÉMON  UNIVERSE          ║
  // ╚══════════════════════════════════════╝

  pikachu: {
    name: 'Pikachu',
    sub:  'Electric Type · Kanto',
    svg: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left ear */}
        <path d="M26 30 L16 4 L40 20Z" fill="#EAB308"/>
        <path d="M26 30 L16 4 L40 20Z" fill="none" stroke="#FDE047" strokeWidth="1"/>
        <path d="M22 22 L18 6 L34 18Z" fill="#1f2937"/>
        {/* Right ear */}
        <path d="M74 30 L84 4 L60 20Z" fill="#EAB308"/>
        <path d="M74 30 L84 4 L60 20Z" fill="none" stroke="#FDE047" strokeWidth="1"/>
        <path d="M78 22 L82 6 L66 18Z" fill="#1f2937"/>
        {/* Body */}
        <ellipse cx="50" cy="86" rx="26" ry="28" fill="#EAB308"/>
        <ellipse cx="50" cy="86" rx="26" ry="28" fill="none" stroke="#FDE047" strokeWidth="1.2"/>
        {/* Back brown stripes */}
        <path d="M36 76 Q50 71 64 76" fill="none" stroke="#92400e" strokeWidth="2.5" opacity="0.55"/>
        <path d="M37 83 Q50 78 63 83" fill="none" stroke="#92400e" strokeWidth="2" opacity="0.4"/>
        {/* Head */}
        <ellipse cx="50" cy="46" rx="30" ry="28" fill="#EAB308"/>
        <ellipse cx="50" cy="46" rx="30" ry="28" fill="none" stroke="#FDE047" strokeWidth="1.2"/>
        {/* Eyes */}
        <circle cx="35" cy="41" r="7" fill="#1f2937"/>
        <circle cx="65" cy="41" r="7" fill="#1f2937"/>
        <circle cx="37" cy="38" r="2.5" fill="white"/>
        <circle cx="67" cy="38" r="2.5" fill="white"/>
        {/* Red cheeks */}
        <ellipse cx="20" cy="54" rx="9" ry="7" fill="#EF4444" opacity="0.9"/>
        <ellipse cx="80" cy="54" rx="9" ry="7" fill="#EF4444" opacity="0.9"/>
        {/* Lightning bolt tail */}
        <path d="M72 92 L82 80 L76 70 L86 58" fill="none" stroke="#EAB308" strokeWidth="5" strokeLinecap="round"/>
        <path d="M72 92 L82 80 L76 70 L86 58" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },

  mewtwo: {
    name: 'Mewtwo',
    sub:  'Psychic Type · Genetic Pokémon',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tube from back of head */}
        <path d="M60 22 Q78 12 84 28" fill="none" stroke="#C084FC" strokeWidth="5" strokeLinecap="round"/>
        <path d="M60 22 Q78 12 84 28" fill="none" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        {/* Long tail */}
        <path d="M64 94 Q84 104 86 84 Q84 64 72 70" fill="none" stroke="#C084FC" strokeWidth="4" strokeLinecap="round"/>
        <path d="M64 94 Q84 104 86 84 Q84 64 72 70" fill="none" stroke="#D946EF" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
        {/* Slim body */}
        <path d="M32 80 Q30 114 50 118 Q70 114 68 80 Q60 70 50 70 Q40 70 32 80Z" fill="#c8a8d8"/>
        <path d="M32 80 Q30 114 50 118 Q70 114 68 80 Q60 70 50 70 Q40 70 32 80Z"
          fill="none" stroke="#D946EF" strokeWidth="1.2"/>
        {/* Belly lighter */}
        <ellipse cx="50" cy="96" rx="12" ry="15" fill="#e8d0f0" opacity="0.75"/>
        {/* Large head */}
        <ellipse cx="50" cy="42" rx="34" ry="36" fill="#d4b8e0"/>
        <ellipse cx="50" cy="42" rx="34" ry="36" fill="none" stroke="#D946EF" strokeWidth="1.5"/>
        {/* Psychic gem */}
        <circle cx="50" cy="18" r="5" fill="#D946EF" opacity="0.9"/>
        <circle cx="50" cy="18" r="3" fill="#E879F9"/>
        {/* Narrow intense eyes */}
        <path d="M20 44 Q34 30 46 40 Q34 52 20 44Z" fill="#1a1230"/>
        <path d="M54 40 Q66 30 80 44 Q66 52 54 40Z" fill="#1a1230"/>
        {/* Cyan iris */}
        <path d="M24 44 Q34 32 44 40 Q34 50 24 44Z" fill="#67E8F9" opacity="0.65"/>
        <path d="M56 40 Q66 32 76 44 Q66 50 56 40Z" fill="#67E8F9" opacity="0.65"/>
      </svg>
    ),
  },

  gengar: {
    name: 'Gengar',
    sub:  'Ghost & Poison Type · Shadow',
    svg: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Spiky ghost body */}
        <path d="M8 64 Q6 44 14 28 L20 38 Q24 16 38 10 L36 24 Q44 4 50 6 Q56 4 64 24 L62 10 Q76 16 80 38 L86 28 Q94 44 92 64 Q88 92 78 104 Q66 118 50 118 Q34 118 22 104 Q12 92 8 64Z" fill="#2d1b6b"/>
        <path d="M8 64 Q6 44 14 28 L20 38 Q24 16 38 10 L36 24 Q44 4 50 6 Q56 4 64 24 L62 10 Q76 16 80 38 L86 28 Q94 44 92 64 Q88 92 78 104 Q66 118 50 118 Q34 118 22 104 Q12 92 8 64Z"
          fill="none" stroke="#7C3AED" strokeWidth="1.5"/>
        <path d="M8 64 Q6 44 14 28 L20 38 Q24 16 38 10 L36 24 Q44 4 50 6 Q56 4 64 24 L62 10 Q76 16 80 38 L86 28 Q94 44 92 64 Q88 92 78 104 Q66 118 50 118 Q34 118 22 104 Q12 92 8 64Z"
          fill="none" stroke="#a855f7" strokeWidth="0.6" opacity="0.45"/>
        {/* Red eyes */}
        <circle cx="33" cy="48" r="11" fill="#EF4444"/>
        <circle cx="67" cy="48" r="11" fill="#EF4444"/>
        <circle cx="33" cy="48" r="6" fill="#1a0505"/>
        <circle cx="67" cy="48" r="6" fill="#1a0505"/>
        <circle cx="30" cy="45" r="3" fill="white" opacity="0.5"/>
        <circle cx="64" cy="45" r="3" fill="white" opacity="0.5"/>
        {/* Wide grin */}
        <path d="M18 74 Q34 94 50 96 Q66 94 82 74 L76 74 Q62 88 50 90 Q38 88 24 74Z" fill="#1a0a3e"/>
        <path d="M18 74 Q34 94 50 96 Q66 94 82 74" fill="none" stroke="#d8b4fe" strokeWidth="2"/>
        {/* Teeth */}
        <path d="M26 74 L28 82 L33 74" fill="white" opacity="0.92"/>
        <path d="M40 75 L42 84 L47 75" fill="white" opacity="0.92"/>
        <path d="M53 75 L57 84 L62 75" fill="white" opacity="0.92"/>
        <path d="M67 74 L71 82 L76 74" fill="white" opacity="0.92"/>
      </svg>
    ),
  },

  // ╔══════════════════════════════════════╗
  // ║           BEN  10  UNIVERSE          ║
  // ╚══════════════════════════════════════╝

  fourarms: {
    name: 'Four Arms',
    sub:  'Four Arms · Ben 10',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* BACK lower arms — behind body, drawn first */}
        <path d="M14 66 Q2 74 6 92 L20 88 Q14 76 22 70Z" fill="#8B1200" opacity="0.72"/>
        <path d="M86 66 Q98 74 94 92 L80 88 Q86 76 78 70Z" fill="#8B1200" opacity="0.72"/>
        {/* Wide muscular body */}
        <path d="M16 82 Q14 122 50 124 Q86 122 84 82 Q66 68 50 68 Q34 68 16 82Z" fill="#CC2200"/>
        <path d="M16 82 Q14 122 50 124 Q86 122 84 82 Q66 68 50 68 Q34 68 16 82Z"
          fill="none" stroke="#EF4444" strokeWidth="1.5"/>
        {/* Omnitrix — the green watch on chest */}
        <circle cx="50" cy="96" r="11" fill="#15803d"/>
        <circle cx="50" cy="96" r="8"  fill="#16A34A"/>
        <circle cx="50" cy="96" r="5"  fill="#4ADE80"/>
        <path d="M47 93 L50 87 L53 93 L53 99 L47 99Z" fill="#14532d" opacity="0.85"/>
        {/* FRONT upper arms — on top, drawn after body */}
        <path d="M16 78 Q0 82 0 100 L16 98 Q12 84 26 82Z" fill="#CC2200"/>
        <path d="M16 78 Q0 82 0 100 L16 98 Q12 84 26 82Z" fill="none" stroke="#EF4444" strokeWidth="1.2"/>
        {/* Fist left */}
        <ellipse cx="6" cy="100" rx="9" ry="8" fill="#CC2200" stroke="#EF4444" strokeWidth="1"/>
        <path d="M84 78 Q100 82 100 100 L84 98 Q88 84 74 82Z" fill="#CC2200"/>
        <path d="M84 78 Q100 82 100 100 L84 98 Q88 84 74 82Z" fill="none" stroke="#EF4444" strokeWidth="1.2"/>
        {/* Fist right */}
        <ellipse cx="94" cy="100" rx="9" ry="8" fill="#CC2200" stroke="#EF4444" strokeWidth="1"/>
        {/* Large rectangular head */}
        <rect x="14" y="22" width="72" height="52" rx="11" fill="#CC2200"/>
        <rect x="14" y="22" width="72" height="52" rx="11" fill="none" stroke="#EF4444" strokeWidth="1.5"/>
        {/* 4 yellow eyes: top row, bottom row */}
        <ellipse cx="32" cy="38" rx="8"   ry="9"   fill="#FBBF24"/>
        <ellipse cx="68" cy="38" rx="8"   ry="9"   fill="#FBBF24"/>
        <ellipse cx="32" cy="57" rx="7"   ry="8"   fill="#FBBF24"/>
        <ellipse cx="68" cy="57" rx="7"   ry="8"   fill="#FBBF24"/>
        {/* Dark pupils */}
        <circle cx="32" cy="38" r="4"   fill="#1a0500"/>
        <circle cx="68" cy="38" r="4"   fill="#1a0500"/>
        <circle cx="32" cy="57" r="3.5" fill="#1a0500"/>
        <circle cx="68" cy="57" r="3.5" fill="#1a0500"/>
        {/* Eye highlights */}
        <circle cx="34" cy="35" r="1.8" fill="white" opacity="0.7"/>
        <circle cx="70" cy="35" r="1.8" fill="white" opacity="0.7"/>
      </svg>
    ),
  },

  diamondhead: {
    name: 'Diamondhead',
    sub:  'Diamondhead · Ben 10',
    svg: (
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shoulder crystal spikes */}
        <path d="M10 88 L0  70 L16 80Z" fill="#047857" stroke="#10B981" strokeWidth="0.8"/>
        <path d="M8  102 L0  86 L14 94Z" fill="#065f46" stroke="#10B981" strokeWidth="0.8" opacity="0.7"/>
        <path d="M90 88 L100 70 L84 80Z" fill="#047857" stroke="#10B981" strokeWidth="0.8"/>
        <path d="M92 102 L100 86 L86 94Z" fill="#065f46" stroke="#10B981" strokeWidth="0.8" opacity="0.7"/>
        {/* Crystal body */}
        <path d="M24 84 Q22 120 50 122 Q78 120 76 84 Q62 72 50 72 Q38 72 24 84Z" fill="#059669"/>
        <path d="M24 84 Q22 120 50 122 Q78 120 76 84 Q62 72 50 72 Q38 72 24 84Z"
          fill="none" stroke="#10B981" strokeWidth="1.5"/>
        {/* Body crystal facets */}
        <path d="M36 86 L50 80 L64 86 L64 104 L50 110 L36 104Z" fill="#047857" opacity="0.5"/>
        <path d="M36 86 L50 80 L64 86" fill="none" stroke="#34D399" strokeWidth="1" opacity="0.65"/>
        <line x1="36" y1="95" x2="64" y2="95" stroke="#34D399" strokeWidth="0.8" opacity="0.4"/>
        {/* Hexagonal crystal head — multiple cut facets */}
        <path d="M50 4 L82 26 L82 66 L50 86 L18 66 L18 26Z" fill="#059669"/>
        <path d="M50 4 L82 26 L82 66 L50 86 L18 66 L18 26Z"
          fill="none" stroke="#10B981" strokeWidth="1.5"/>
        {/* Top table facet */}
        <path d="M50 4 L82 26 L50 40 L18 26Z" fill="#047857" opacity="0.55"/>
        <path d="M50 4 L82 26 L50 40" fill="none" stroke="#34D399" strokeWidth="0.9" opacity="0.7"/>
        <path d="M50 4 L18 26 L50 40" fill="none" stroke="#34D399" strokeWidth="0.9" opacity="0.55"/>
        {/* Girdle / equator line */}
        <line x1="18" y1="40" x2="82" y2="40" stroke="#34D399" strokeWidth="0.9" opacity="0.5"/>
        {/* Pavilion facet lines */}
        <line x1="18" y1="26" x2="50" y2="40" stroke="#34D399" strokeWidth="0.7" opacity="0.45"/>
        <line x1="82" y1="26" x2="50" y2="40" stroke="#34D399" strokeWidth="0.7" opacity="0.45"/>
        <line x1="18" y1="54" x2="50" y2="40" stroke="#34D399" strokeWidth="0.7" opacity="0.35"/>
        <line x1="82" y1="54" x2="50" y2="40" stroke="#34D399" strokeWidth="0.7" opacity="0.35"/>
        {/* Rectangular flat eyes — Diamondhead's look */}
        <rect x="20" y="50" width="22" height="9" rx="2" fill="white" opacity="0.95"/>
        <rect x="58" y="50" width="22" height="9" rx="2" fill="white" opacity="0.95"/>
        {/* Green crystal tint in eyes */}
        <rect x="20" y="50" width="22" height="9" rx="2" fill="#34D399" opacity="0.42"/>
        <rect x="58" y="50" width="22" height="9" rx="2" fill="#34D399" opacity="0.42"/>
      </svg>
    ),
  },

}
