// Placeholder bottle drawn in SVG. Replace with a real product PNG later
// (put it in src/assets and use <img> in Hero.jsx instead).
export default function PerfumeBottle() {
  return (
    <svg
      className="bottle"
      viewBox="0 0 220 380"
      role="img"
      aria-label="Nilufer eau de parfum bottle"
    >
      <defs>
        <radialGradient id="cap" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fff1c2" />
          <stop offset="0.35" stopColor="#d9a93f" />
          <stop offset="1" stopColor="#7a5112" />
        </radialGradient>
        <linearGradient id="collar" x1="0" x2="1">
          <stop offset="0" stopColor="#8a6218" />
          <stop offset="0.45" stopColor="#f0cf79" />
          <stop offset="1" stopColor="#7a5112" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1">
          <stop offset="0" stopColor="#2a0e06" />
          <stop offset="0.25" stopColor="#8a3a12" />
          <stop offset="0.6" stopColor="#5a2410" />
          <stop offset="1" stopColor="#1e0a04" />
        </linearGradient>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9732a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6a2a0c" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="shine" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="shadow" x="-30%" y="-10%" width="160%" height="130%">
          <feDropShadow dx="14" dy="20" stdDeviation="14" floodColor="#3a1a08" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#shadow)">
        {/* cap */}
        <circle cx="110" cy="46" r="40" fill="url(#cap)" />
        <ellipse cx="96" cy="32" rx="14" ry="9" fill="#fff" opacity="0.35" />
        {/* collar */}
        <rect x="84" y="82" width="52" height="26" rx="4" fill="url(#collar)" />
        <rect x="84" y="96" width="52" height="3" fill="#5a3b0a" opacity="0.5" />
        {/* body */}
        <rect x="32" y="106" width="156" height="262" rx="14" fill="url(#glass)" />
        <rect x="44" y="120" width="132" height="236" rx="8" fill="url(#liquid)" />
        <rect x="32" y="106" width="156" height="262" rx="14" fill="none" stroke="#e9c777" strokeOpacity="0.5" />
        {/* shine */}
        <rect x="52" y="120" width="26" height="236" fill="url(#shine)" />
        {/* label */}
        <g fill="#f3dca0" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif">
          <text x="110" y="212" fontSize="24" letterSpacing="3">NILUFER</text>
          <text x="110" y="232" fontSize="8" letterSpacing="3" fontFamily="Jost, sans-serif">EAU DE PARFUM</text>
          <line x1="80" x2="140" y1="244" y2="244" stroke="#f3dca0" strokeOpacity="0.5" />
          <text x="110" y="334" fontSize="9" letterSpacing="2" fontFamily="Jost, sans-serif">100 ML</text>
        </g>
      </g>
    </svg>
  )
}
