import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import Reveal from './Reveal'
import BottleArt from './BottleArt'
import ProductImage from './ProductImage'
import { productImages } from '../lib/productImages'

// Portrait: put model.jpg (or .png/.webp) in src/assets/perfumes/
const MODEL_PHOTO = productImages.model ?? null

/* ------------------------- animated letters ------------------------- */

// Letters appear one by one once `show` is true.
function Letters({ text, show, delay = 0, step = 70, mode = 'fade' }) {
  return [...text].map((ch, i) => (
    <span
      key={i}
      aria-hidden="true"
      className={
        'inline-block transition-all duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ' +
        (mode === 'fade'
          ? show ? 'scale-100 opacity-100 blur-0' : 'scale-50 opacity-0 blur-sm'
          : show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0')
      }
      style={{ transitionDelay: `${delay + i * step}ms` }}
    >
      {ch}
    </span>
  ))
}

// One vertical column of text that reads from bottom to top.
function VerticalWord({ text, show, delay }) {
  return (
    <h2
      aria-label={text}
      className="rotate-180 select-none font-luxe font-medium uppercase leading-[0.9] tracking-[-0.02em] text-amber-deep [writing-mode:vertical-rl] text-[clamp(4rem,7.4vw,6.8rem)]"
    >
      <Letters text={text} show={show} delay={delay} step={90} />
    </h2>
  )
}

/* ------------------------- small illustrations ------------------------- */

function ArchPortrait({ className = '' }) {
  return (
    <div
      className={
        'group relative overflow-hidden rounded-full bg-gradient-to-b from-sand-light to-gold/50 shadow-[0_18px_30px_-16px_rgba(90,36,16,0.55)] ring-1 ring-gold-deep/30 ' +
        className
      }
    >
      {MODEL_PHOTO ? (
        <img src={MODEL_PHOTO} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      ) : (
        <svg viewBox="0 0 110 160" className="h-full w-full transition-transform duration-700 group-hover:scale-110" aria-hidden="true">
          <path d="M6 160C8 122 30 104 55 100c25 4 47 22 49 60Z" fill="#5a3a28" />
          <path d="M40 103l15 28 15-28Z" fill="#f1e6d0" />
          <path d="M55 118l-5 9 5 33 5-33Z" fill="#8a3a1a" />
          <rect x="49" y="82" width="12" height="20" fill="#c79a74" />
          <ellipse cx="55" cy="64" rx="16" ry="20" fill="#d6ae8a" />
          <path d="M38 62C38 38 72 36 72 62 66 50 46 50 38 62Z" fill="#2a1a12" />
        </svg>
      )}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/25" />
    </div>
  )
}

function PeachBadge({ className = '' }) {
  return (
    <div className={'group relative animate-float ' + className}>
      <span className="absolute inset-0 animate-ping-slow rounded-full border border-gold-deep/40" />
      <svg viewBox="0 0 100 100" className="relative h-full w-full drop-shadow-[0_12px_14px_rgba(90,36,16,0.3)]" aria-hidden="true">
        <defs>
          <radialGradient id="pb-bg" cx="40%" cy="30%" r="80%">
            <stop offset="0" stopColor="#fbf3e2" />
            <stop offset="1" stopColor="#e9d6b0" />
          </radialGradient>
          <radialGradient id="pb-peach" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#ffd9a8" />
            <stop offset="0.6" stopColor="#f0a066" />
            <stop offset="1" stopColor="#d26f3e" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="url(#pb-bg)" stroke="#c9a45c" strokeOpacity="0.5" />
        <ellipse cx="50" cy="76" rx="32" ry="9" fill="#b58a5a" />
        <ellipse cx="50" cy="73" rx="32" ry="9" fill="#d6b284" />
        <ellipse cx="50" cy="73" rx="22" ry="5.5" fill="none" stroke="#a8814e" strokeOpacity="0.6" />
        <g className="origin-center transition-transform duration-700 group-hover:rotate-12 [transform-box:fill-box]">
          <circle cx="60" cy="54" r="18" fill="url(#pb-peach)" />
          <path d="M60 36c-5 8-5 28 0 36" fill="none" stroke="#b9582c" strokeOpacity="0.5" />
          <path d="M60 36c4-7 12-8 16-5-3 5-9 7-16 5Z" fill="#7d8450" />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx="34" cy="38" rx="6" ry="12" fill="#fbe2d0" stroke="#e4a98a" strokeWidth="0.6" transform={`rotate(${i * 72 - 20} 34 48)`} />
          ))}
          <circle cx="34" cy="48" r="3" fill="#e9a65e" />
        </g>
      </svg>
    </div>
  )
}

function Blossom({ x, y, r = 24, rot = 0, delay = 0, show }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g
        className={
          'origin-center transition-all duration-[900ms] ease-[cubic-bezier(0.3,1.6,0.4,1)] [transform-box:fill-box] ' +
          (show ? 'scale-100 opacity-100' : 'scale-0 opacity-0')
        }
        style={{ transitionDelay: `${delay}ms` }}
      >
        <g className="origin-center animate-sway [transform-box:fill-box]" style={{ animationDelay: `${delay}ms`, animationDuration: `${4 + (delay % 3)}s` }}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy={-r * 0.55} rx={r * 0.46} ry={r * 0.66} transform={`rotate(${a})`} fill="url(#petal)" stroke="#d98a6a" strokeOpacity="0.4" strokeWidth="0.8" />
          ))}
          <circle r={r * 0.2} fill="#e9a65e" />
          <circle r={r * 0.09} fill="#b9622a" />
        </g>
      </g>
    </g>
  )
}

function Leaf({ x, y, rot = 0, s = 1, delay = 0, show }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <g
        className={'origin-left transition-all duration-700 [transform-box:fill-box] ' + (show ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <path d="M0 0C10-15 30-15 40 0 30 13 10 13 0 0Z" fill="#7d8450" />
        <path d="M2 0H36" stroke="#5a6035" strokeWidth="1" opacity="0.6" />
      </g>
    </g>
  )
}

const branches = [
  { d: 'M780 340C700 340 650 330 600 300C560 312 540 270 500 250 455 228 470 180 430 150 400 128 350 150 320 120 290 90 240 110 200 80 170 58 140 70 120 52', w: 7, delay: 0, dur: 2.6 },
  { d: 'M500 250C520 200 540 150 520 104 510 74 470 64 466 44', w: 5, delay: 900, dur: 1.6 },
  { d: 'M430 150C380 170 340 200 314 192', w: 4, delay: 1300, dur: 1.2 },
  { d: 'M320 120C335 92 360 72 372 48', w: 3.5, delay: 1500, dur: 1.2 },
  { d: 'M200 80C215 56 205 38 182 28', w: 3, delay: 1900, dur: 1 },
  { d: 'M252 100C262 120 270 135 268 152', w: 2.5, delay: 1700, dur: 0.9 },
]

/* ------------------------------- section ------------------------------- */

export default function NewCollection() {
  const [ref, inView] = useInView(0.18)
  const boxRef = useRef(null)

  // layers drift a little against the mouse pointer
  const onMove = (e) => {
    const r = boxRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    boxRef.current.style.setProperty('--px', x.toFixed(3))
    boxRef.current.style.setProperty('--py', y.toFixed(3))
  }
  const layer = (x, y) => ({
    transform: `translate3d(calc(var(--px, 0) * ${x}px), calc(var(--py, 0) * ${y}px), 0)`,
  })

  return (
    <section
      ref={boxRef}
      onMouseMove={onMove}
      aria-label="New collection"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_72%_38%,rgba(255,250,236,0.85),transparent_60%)]"
    >
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-x-6 gap-y-8 px-6 pb-20 pt-14 md:grid-cols-[5fr_7fr] md:px-10 md:pb-24 md:pt-20">
        {/* ---------- title ---------- */}
        <div className="order-1 md:col-start-1 md:row-start-1">
          {/* desktop: three vertical columns */}
          <div className="hidden items-end gap-1 md:flex lg:gap-3">
            <div className="flex flex-col items-center gap-5">
              <Reveal from="zoom" delay={900}>
                <PeachBadge className="h-24 w-24 lg:h-28 lg:w-28" />
              </Reveal>
              <VerticalWord text="New" show={inView} delay={100} />
            </div>
            <VerticalWord text="Collec" show={inView} delay={400} />
            <div className="flex flex-col items-center gap-5">
              <Reveal from="zoom" delay={1100}>
                <ArchPortrait className="h-40 w-[6.5rem] lg:h-44 lg:w-28" />
              </Reveal>
              <VerticalWord text="Tion" show={inView} delay={800} />
            </div>
          </div>

          {/* mobile: horizontal title */}
          <div className="md:hidden">
            <div className="flex items-center gap-4">
              <h2 aria-label="New" className="overflow-hidden font-luxe text-[5.5rem] font-medium uppercase leading-[0.95] text-amber-deep">
                <Letters text="New" show={inView} delay={100} step={110} mode="rise" />
              </h2>
              <Reveal from="zoom" delay={700}>
                <PeachBadge className="h-20 w-20" />
              </Reveal>
            </div>
            <h2 aria-label="Collection" className="overflow-hidden font-luxe whitespace-nowrap text-[clamp(2.2rem,11.8vw,4.2rem)] font-medium uppercase leading-[0.95] text-amber-deep">
              <Letters text="Collection" show={inView} delay={450} step={70} mode="rise" />
            </h2>
          </div>
        </div>

        {/* ---------- scene ---------- */}
        <div className="order-2 md:col-start-2 md:row-span-2 md:row-start-1">
          <div className="relative mx-auto aspect-[600/640] w-full max-w-[640px]">
            {/* soft glow behind bottle */}
            <div className="absolute left-[46%] top-[62%] h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[#f2b98d]/50 blur-3xl" />

            {/* branch + rock */}
            <div className="absolute inset-0 transition-transform duration-300 ease-out" style={layer(-14, -8)}>
              <div className="h-full w-full origin-[100%_48%] animate-sway-soft">
                <svg viewBox="0 0 600 640" className="h-full w-full overflow-visible" aria-hidden="true">
                  <defs>
                    <radialGradient id="petal" cx="50%" cy="70%" r="80%">
                      <stop offset="0" stopColor="#fdeadd" />
                      <stop offset="1" stopColor="#efb496" />
                    </radialGradient>
                    <linearGradient id="wood" x1="0" x2="1">
                      <stop offset="0" stopColor="#5e4331" />
                      <stop offset="1" stopColor="#8a6a50" />
                    </linearGradient>
                  </defs>

                  {branches.map((b, i) => (
                    <path
                      key={i}
                      d={b.d}
                      pathLength="1"
                      fill="none"
                      stroke="url(#wood)"
                      strokeWidth={b.w}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={inView ? 'animate-draw' : ''}
                      style={{ strokeDasharray: 1, strokeDashoffset: 1, animationDelay: `${b.delay}ms`, animationDuration: `${b.dur}s` }}
                    />
                  ))}

                  <Leaf x={455} y={226} rot={-30} s={0.9} delay={1900} show={inView} />
                  <Leaf x={395} y={152} rot={-150} s={0.8} delay={2000} show={inView} />
                  <Leaf x={290} y={100} rot={-70} s={0.8} delay={2100} show={inView} />
                  <Leaf x={510} y={120} rot={-120} s={0.7} delay={2200} show={inView} />
                  <Leaf x={225} y={92} rot={200} s={0.7} delay={2300} show={inView} />

                  <Blossom x={466} y={44} r={27} rot={10} delay={2200} show={inView} />
                  <Blossom x={372} y={48} r={22} rot={-20} delay={2450} show={inView} />
                  <Blossom x={520} y={104} r={25} rot={30} delay={2650} show={inView} />
                  <Blossom x={314} y={192} r={23} rot={-10} delay={2800} show={inView} />
                  <Blossom x={182} y={28} r={19} rot={40} delay={3000} show={inView} />
                  <Blossom x={268} y={152} r={18} rot={-30} delay={3150} show={inView} />

                  {/* driftwood rock */}
                  <g>
                    <defs>
                      <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#9a9086" />
                        <stop offset="0.55" stopColor="#6e655b" />
                        <stop offset="1" stopColor="#3f3830" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M60 566C70 524 170 506 262 512 362 500 478 496 548 532 590 554 584 590 540 604 440 632 180 630 98 606 66 596 52 582 60 566Z"
                      fill="url(#rock)"
                      className={'origin-bottom transition-all duration-1000 [transform-box:fill-box] ' + (inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}
                    />
                    <g fill="none" stroke="#2f2a24" strokeOpacity="0.35" strokeLinecap="round">
                      <path d="M100 560C200 540 330 548 420 536" />
                      <path d="M130 584C230 570 340 578 470 566" />
                      <path d="M170 604C260 596 360 604 450 596" />
                    </g>
                    <path d="M110 548C200 524 330 522 440 518" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>

            {/* falling petals */}
            <div className="pointer-events-none absolute inset-x-[8%] top-[4%] h-[70%]" aria-hidden="true">
              {[
                { l: '18%', d: 0, s: 11 },
                { l: '35%', d: 2.5, s: 8 },
                { l: '52%', d: 5, s: 12 },
                { l: '68%', d: 1.2, s: 9 },
                { l: '84%', d: 6.5, s: 10 },
                { l: '45%', d: 7.8, s: 7 },
              ].map((p, i) => (
                <span
                  key={i}
                  className="absolute top-0 animate-fall rounded-[50%_0_50%_0] bg-gradient-to-br from-[#fdeadd] to-[#efb496] opacity-0"
                  style={{ left: p.l, width: p.s, height: p.s, animationDelay: `${p.d}s`, animationDuration: `${9 + (i % 3) * 2}s` }}
                />
              ))}
            </div>

            {/* bottle */}
            <div className="absolute bottom-[14.5%] left-[46%] w-[27%] -translate-x-1/2 transition-transform duration-300 ease-out" style={layer(18, 10)}>
              <div
                className={'group transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ' + (inView ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0')}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="relative aspect-[220/380] transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-[-3deg]">
                  <ProductImage
                    id="peachwood"
                    alt="Peachwood eau de parfum"
                    className="absolute inset-0"
                    fallback={<BottleArt shape="flask" liquid={['#f6c196', '#e08a58']} glass="#b8683c" cap={['#fff4e2', '#e8c9a0', '#9a7442']} name="Peachwood" />}
                  />
                </div>
              </div>
            </div>

            {/* arch portrait for mobile (desktop shows it in the title) */}
            <Reveal from="zoom" delay={900} className="absolute left-0 top-[34%] md:hidden">
              <ArchPortrait className="h-28 w-[4.5rem]" />
            </Reveal>
          </div>
        </div>

        {/* ---------- description ---------- */}
        <div className="order-3 md:col-start-1 md:row-start-2 md:max-w-[34ch]">
          <Reveal from="up" delay={200}>
            <p className="text-sm font-light leading-[1.85]">
              Peachwood is a soft, sunlit fragrance. Magnolia petals meet ripe peach, then settle into a warm trail of
              cedar and driftwood. Elegant, easy to wear and hard to forget.
            </p>
          </Reveal>
          <Reveal from="up" delay={400}>
            <Link
              to="/collections"
              className="group relative mt-6 inline-block overflow-hidden border border-ink px-8 py-2.5 text-sm transition-colors duration-500 hover:text-sand-light"
            >
              <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Shop the new collection</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
