import { useId } from 'react'

// Procedural perfume bottle. Swap for real product photos later.
export default function BottleArt({
  shape = 'classic',
  liquid = ['#c9732a', '#6a2a0c'],
  glass = '#3a1608',
  cap = ['#fff1c2', '#d9a93f', '#7a5112'],
  name = 'NILUFER',
  className = '',
}) {
  const uid = useId().replace(/:/g, '')
  const id = (n) => `${n}-${uid}`

  const label = name.toUpperCase()
  const maxW = shape === 'slim' ? 11 : shape === 'flask' ? 16 : 20
  const fs = Math.min(maxW, Math.round(150 / Math.max(label.length, 1) * 2.6))

  return (
    <svg viewBox="0 0 220 380" className={'block h-auto w-full overflow-visible ' + className} role="img" aria-label={`${name} bottle`}>
      <defs>
        <radialGradient id={id('cap')} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor={cap[0]} />
          <stop offset="0.4" stopColor={cap[1]} />
          <stop offset="1" stopColor={cap[2]} />
        </radialGradient>
        <linearGradient id={id('capL')} x1="0" x2="1">
          <stop offset="0" stopColor={cap[2]} />
          <stop offset="0.45" stopColor={cap[0]} />
          <stop offset="1" stopColor={cap[2]} />
        </linearGradient>
        <linearGradient id={id('glass')} x1="0" x2="1">
          <stop offset="0" stopColor={glass} />
          <stop offset="0.3" stopColor={liquid[0]} />
          <stop offset="0.7" stopColor={liquid[1]} />
          <stop offset="1" stopColor={glass} />
        </linearGradient>
        <linearGradient id={id('liq')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={liquid[0]} stopOpacity="0.95" />
          <stop offset="1" stopColor={liquid[1]} />
        </linearGradient>
        <linearGradient id={id('cork')} x1="0" x2="1">
          <stop offset="0" stopColor="#a8814e" />
          <stop offset="0.5" stopColor="#e2c89a" />
          <stop offset="1" stopColor="#9a7442" />
        </linearGradient>
        <linearGradient id={id('shine')} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={id('sh')} x="-30%" y="-10%" width="160%" height="130%">
          <feDropShadow dx="12" dy="18" stdDeviation="12" floodColor="#3a1a08" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter={`url(#${id('sh')})`}>
        {shape === 'classic' && (
          <>
            <circle cx="110" cy="46" r="40" fill={`url(#${id('cap')})`} />
            <ellipse cx="96" cy="32" rx="14" ry="9" fill="#fff" opacity="0.35" />
            <rect x="84" y="82" width="52" height="26" rx="4" fill={`url(#${id('capL')})`} />
            <rect x="32" y="106" width="156" height="262" rx="14" fill={`url(#${id('glass')})`} />
            <rect x="44" y="120" width="132" height="236" rx="8" fill={`url(#${id('liq')})`} />
            <rect x="32" y="106" width="156" height="262" rx="14" fill="none" stroke={cap[0]} strokeOpacity="0.45" />
            <rect x="52" y="120" width="26" height="236" fill={`url(#${id('shine')})`} />
          </>
        )}
        {shape === 'slim' && (
          <>
            <rect x="78" y="10" width="64" height="66" rx="8" fill={`url(#${id('capL')})`} />
            <rect x="84" y="16" width="14" height="54" rx="4" fill="#fff" opacity="0.22" />
            <rect x="92" y="76" width="36" height="20" rx="3" fill={`url(#${id('capL')})`} />
            <rect x="52" y="94" width="116" height="274" rx="10" fill={`url(#${id('glass')})`} />
            <rect x="62" y="106" width="96" height="250" rx="6" fill={`url(#${id('liq')})`} />
            <rect x="52" y="94" width="116" height="274" rx="10" fill="none" stroke={cap[0]} strokeOpacity="0.45" />
            <rect x="68" y="106" width="20" height="250" fill={`url(#${id('shine')})`} />
          </>
        )}
        {shape === 'flask' && (
          <>
            <rect x="88" y="6" width="44" height="42" rx="6" fill={`url(#${id('cork')})`} />
            <rect x="94" y="14" width="6" height="30" rx="3" fill="#fff" opacity="0.25" />
            <rect x="96" y="46" width="28" height="30" fill={`url(#${id('glass')})`} />
            <path d="M40 132 C40 102 84 86 96 74 L124 74 C136 86 180 102 180 132 L180 346 Q180 368 158 368 L62 368 Q40 368 40 346 Z" fill={`url(#${id('glass')})`} />
            <path d="M50 134 C50 108 90 94 102 82 L118 82 C130 94 170 108 170 134 L170 344 Q170 358 156 358 L64 358 Q50 358 50 344 Z" fill={`url(#${id('liq')})`} />
            <path d="M40 132 C40 102 84 86 96 74 L124 74 C136 86 180 102 180 132 L180 346 Q180 368 158 368 L62 368 Q40 368 40 346 Z" fill="none" stroke={cap[0]} strokeOpacity="0.5" />
            <rect x="58" y="110" width="22" height="236" rx="10" fill={`url(#${id('shine')})`} />
          </>
        )}
        {shape === 'round' && (
          <>
            <rect x="86" y="14" width="48" height="58" rx="12" fill={`url(#${id('capL')})`} />
            <rect x="92" y="20" width="10" height="46" rx="4" fill="#fff" opacity="0.25" />
            <rect x="96" y="72" width="28" height="22" rx="3" fill={`url(#${id('capL')})`} />
            <rect x="94" y="94" width="32" height="90" fill={`url(#${id('glass')})`} />
            <circle cx="110" cy="272" r="98" fill={`url(#${id('glass')})`} />
            <circle cx="110" cy="272" r="86" fill={`url(#${id('liq')})`} />
            <circle cx="110" cy="272" r="98" fill="none" stroke={cap[0]} strokeOpacity="0.45" />
            <ellipse cx="72" cy="232" rx="12" ry="42" fill="#fff" opacity="0.28" transform="rotate(18 72 232)" />
          </>
        )}

        <g fill={cap[0]} textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif">
          <text x="110" y={shape === 'round' ? 268 : shape === 'slim' ? 230 : shape === 'flask' ? 236 : 218} fontSize={fs} letterSpacing="2">
            {label}
          </text>
          <text x="110" y={shape === 'round' ? 286 : shape === 'slim' ? 246 : shape === 'flask' ? 254 : 236} fontSize="7.5" letterSpacing="3" fontFamily="Jost, sans-serif">
            EAU DE PARFUM
          </text>
        </g>
      </g>
    </svg>
  )
}
