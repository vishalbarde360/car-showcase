import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import Counter from '../components/Counter'
import TiltCard from '../components/TiltCard'
import PerfumeBottle from '../components/PerfumeBottle'
import ProductImage from '../components/ProductImage'
import NewCollection from '../components/NewCollection'

/* ------------------------------ data ------------------------------ */

const petals = [
  { left: '6%', top: '70%', size: 14, dur: 11, delay: 0 },
  { left: '15%', top: '85%', size: 9, dur: 14, delay: 3 },
  { left: '24%', top: '60%', size: 12, dur: 12, delay: 6 },
  { left: '33%', top: '90%', size: 8, dur: 16, delay: 1 },
  { left: '42%', top: '75%', size: 16, dur: 13, delay: 8 },
  { left: '52%', top: '88%', size: 10, dur: 15, delay: 4 },
  { left: '61%', top: '65%', size: 13, dur: 12, delay: 9 },
  { left: '70%', top: '92%', size: 9, dur: 17, delay: 2 },
  { left: '78%', top: '72%', size: 15, dur: 13, delay: 7 },
  { left: '86%', top: '86%', size: 11, dur: 14, delay: 5 },
  { left: '93%', top: '62%', size: 8, dur: 15, delay: 10 },
  { left: '48%', top: '55%', size: 7, dur: 18, delay: 12 },
]

const stats = [
  { to: 12, suffix: '', label: 'signature scents' },
  { to: 30, suffix: ' days', label: 'resting in glass' },
  { to: 48, suffix: '', label: 'hand-picked ingredients' },
  { to: 8500, suffix: '+', label: 'bottles poured by hand' },
]

const promises = [
  'No shortcuts: every batch rests for thirty days',
  'Natural oils first, synthetics only where they help',
  'Poured, capped and labelled by hand',
]

const ingredients = ['White lotus', 'Amber', 'Oud', 'Sandalwood', 'Jasmine', 'Saffron', 'Musk', 'Rose', 'Vetiver', 'Bergamot']
const ingredientsRev = ['Cardamom', 'Patchouli', 'Tuberose', 'Cedar', 'Vanilla', 'Iris', 'Myrrh', 'Neroli', 'Frankincense', 'Tonka']

const steps = [
  { title: 'Gathering', text: 'Petals, woods and resins are picked at dawn from small growers, when their oils are strongest.' },
  { title: 'Extraction', text: 'Slow steam and cold pressing draw out each note without burning the delicate ones.' },
  { title: 'Blending', text: 'Our perfumer layers top, heart and base notes by hand until the scent settles into one story.' },
  { title: 'Resting', text: 'The blend sleeps in dark glass for thirty days. Rough edges soften and the notes marry.' },
  { title: 'Bottling', text: 'Each bottle is filled, capped with gold and checked by a person, never a conveyor belt.' },
]

const pillars = [
  {
    title: 'The water lily',
    text: 'Nilufer is the old word for the lotus that blooms on still water. We wanted a scent that feels that calm.',
    icon: (
      <path d="M30 40C22 32 22 14 30 4c8 10 8 28 0 36ZM30 40C18 38 8 28 6 14c12 2 20 12 24 26ZM30 40c12-2 22-12 24-26-12 2-20 12-24 26Z" />
    ),
  },
  {
    title: 'Houses of oud',
    text: 'Dark wood, smoke and resin from old perfumery traditions give our base notes their warmth and depth.',
    icon: (
      <path d="M30 6c8 10 12 16 12 24a12 12 0 0 1-24 0c0-8 4-14 12-24ZM30 42V26M30 34l-6-6M30 30l6-6" />
    ),
  },
  {
    title: 'Evening light',
    text: 'The amber glow just before dusk is the colour we chase in every bottle, and the mood we want you to wear.',
    icon: (
      <path d="M30 18a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM30 4v6M30 50v6M4 30h6M50 30h6M11 11l4 4M45 45l4 4M11 49l4-4M45 15l4-4" />
    ),
  },
]

/* --------------------------- small pieces --------------------------- */

function Lotus({ className = '' }) {
  const d = [
    'M30 40C22 32 22 14 30 4c8 10 8 28 0 36Z',
    'M30 40C18 38 8 28 6 14c12 2 20 12 24 26Z',
    'M30 40c12-2 22-12 24-26-12 2-20 12-24 26Z',
  ]
  return (
    <svg viewBox="0 0 60 44" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        {d.map((path, i) => (
          <path
            key={i}
            d={path}
            pathLength="1"
            className="animate-draw"
            style={{ strokeDasharray: 1, animationDelay: `${300 + i * 350}ms` }}
          />
        ))}
      </g>
    </svg>
  )
}

function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={'font-luxe text-4xl font-medium leading-tight text-amber-deep sm:text-5xl ' + className}>
      {children}
    </h2>
  )
}

/* ------------------------------ page ------------------------------ */

export default function About() {
  const heroRef = useRef(null)
  const glowRef = useRef(null)
  const timelineRef = useRef(null)
  const [progress, setProgress] = useState(0)

  // glow that follows the cursor in the hero
  const onHeroMove = (e) => {
    const r = heroRef.current.getBoundingClientRect()
    glowRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    glowRef.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  // timeline line grows as you scroll
  useEffect(() => {
    const update = () => {
      const el = timelineRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight * 0.6 - r.top) / r.height
      setProgress(Math.min(1, Math.max(0, p)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="text-ink">
      {/* ============ NEW COLLECTION ============ */}
      <NewCollection />

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_320px_at_var(--mx,50%)_var(--my,40%),rgba(201,164,92,0.28),transparent)]"
        />

        {petals.map((p, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute animate-drift rounded-[50%_0_50%_0] bg-gradient-to-br from-sand-light to-gold opacity-0"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <Lotus className="relative mb-8 w-14 text-gold" />

        <h1 className="relative font-luxe text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.95] text-gold-deep">
          <SplitText text="Born from" delay={500} />
          <br />
          <SplitText text="a lotus pond" delay={900} />
        </h1>

        <p
          className="relative mt-8 max-w-[52ch] animate-rise text-base font-light leading-relaxed sm:text-lg"
          style={{ animationDelay: '1800ms' }}
        >
          Nilufer started with one small room, a few jars of petals and a simple rule: a perfume should never be hurried.
        </p>

        <div className="absolute bottom-8 left-1/2 h-10 w-px -translate-x-1/2 bg-gold/40" aria-hidden="true">
          <span className="absolute -left-[2px] top-0 h-[5px] w-[5px] animate-cue rounded-full bg-gold-deep" />
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-10">
        <Reveal from="left" className="mx-auto">
          <div className="relative h-[320px] w-[320px] sm:h-[380px] sm:w-[380px]">
            <svg viewBox="0 0 300 300" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
              <defs>
                <path id="ring" d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0" />
              </defs>
              <text className="fill-gold-deep" fontSize="12.5" letterSpacing="4">
                <textPath href="#ring" textLength="745" lengthAdjust="spacing">
                  Hand poured in small batches - white lotus - oud - amber -{' '}
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-[18%] rounded-full bg-gradient-to-b from-sand-light to-sand shadow-[inset_0_0_40px_rgba(164,124,52,0.25)]" />
            <span className="absolute inset-[18%] animate-ping-slow rounded-full border border-gold" aria-hidden="true" />
            <div className="absolute left-1/2 top-1/2 w-[26%] -translate-x-1/2 -translate-y-1/2 animate-float">
              <ProductImage id="hero-bottle" alt="Nilufer eau de parfum" fallback={<PerfumeBottle />} />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal from="right">
            <SectionTitle>A scent should be slow</SectionTitle>
          </Reveal>
          <Reveal from="right" delay={150}>
            <p className="mt-6 max-w-[56ch] font-light leading-[1.85]">
              We began in 2016, blending for friends and family. The bottles sold out faster than we could fill them, but we
              refused to speed up. Today we still pour in small batches and still let every blend rest before it leaves
              our hands.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {promises.map((t, i) => (
              <Reveal as="li" key={t} from="right" delay={300 + i * 150}>
                <div className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-2">
                  <span className="relative mt-[7px] h-2.5 w-2.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-gold-deep transition-transform duration-300 group-hover:scale-150" />
                    <span className="absolute inset-0 animate-ping-slow rounded-full bg-gold" />
                  </span>
                  <span className="font-light leading-relaxed">{t}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid grid-cols-2 gap-y-10 border-y border-gold/40 py-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} from="zoom" delay={i * 150}>
              <div className="group cursor-default text-center transition-transform duration-300 hover:-translate-y-2">
                <div className="font-luxe text-5xl font-medium text-gold-deep transition-colors duration-300 group-hover:text-amber-deep sm:text-6xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mx-auto mt-3 h-px w-8 bg-gold transition-all duration-500 group-hover:w-20" />
                <p className="mt-3 text-sm font-light">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ INGREDIENT MARQUEE ============ */}
      <section className="overflow-hidden py-10" aria-label="Our ingredients">
        {[
          { list: ingredients, cls: 'animate-marquee' },
          { list: ingredientsRev, cls: 'animate-marquee-rev' },
        ].map((row, ri) => (
          <div key={ri} className="group/row mb-2 overflow-hidden">
            <div className={`flex w-max ${row.cls} group-hover/row:[animation-play-state:paused]`}>
              {[...row.list, ...row.list].map((name, i) => (
                <span
                  key={i}
                  className="mx-6 cursor-default font-luxe text-6xl font-medium text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_#a47c34] hover:text-gold sm:text-7xl"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ============ MAKING OF ============ */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <div className="mb-16 text-center">
          <Reveal>
            <SectionTitle>How every bottle is made</SectionTitle>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-4 max-w-[48ch] font-light leading-relaxed">
              Five steps, no skipped stages. Scroll to follow a bottle from the pond to your shelf.
            </p>
          </Reveal>
        </div>

        <ol ref={timelineRef} className="relative space-y-12 md:space-y-16">
          <span className="absolute bottom-0 left-4 top-0 w-px bg-gold/30 md:left-1/2" aria-hidden="true" />
          <span
            className="absolute left-4 top-0 w-px bg-gold-deep transition-[height] duration-200 md:left-1/2"
            style={{ height: `${progress * 100}%` }}
            aria-hidden="true"
          />

          {steps.map((s, i) => {
            const reached = progress >= (i + 0.4) / steps.length
            const left = i % 2 === 0
            return (
              <li key={s.title} className="relative pl-14 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
                <span
                  className={
                    'absolute left-4 top-6 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border font-luxe text-lg transition-all duration-500 md:left-1/2 ' +
                    (reached
                      ? 'scale-110 border-gold-deep bg-gold-deep text-sand-light shadow-[0_0_0_6px_rgba(201,164,92,0.25)]'
                      : 'border-gold bg-sand-light text-gold-deep')
                  }
                >
                  {i + 1}
                </span>

                <Reveal from={left ? 'left' : 'right'} className={left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}>
                  <div
                    className={
                      'group rounded-2xl border bg-sand-light/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(90,36,16,0.45)] ' +
                      (reached ? 'border-gold-deep/60' : 'border-gold/30')
                    }
                  >
                    <h3 className="font-luxe text-3xl font-medium text-amber-deep">{s.title}</h3>
                    <span
                      className={
                        'mt-3 block h-px bg-gold-deep transition-all duration-500 group-hover:w-full ' +
                        (left ? 'ml-auto ' : '') +
                        'w-10'
                      }
                    />
                    <p className="mt-4 font-light leading-[1.8]">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </section>

      {/* ============ INSPIRATION ============ */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <Reveal className="mb-14 text-center">
          <SectionTitle>What inspires us</SectionTitle>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} from="up" delay={i * 180}>
              <TiltCard className="group h-full rounded-2xl border border-gold/40 bg-gradient-to-b from-sand-light to-sand p-8 hover:shadow-[0_30px_50px_-22px_rgba(90,36,16,0.5)]">
                <svg
                  viewBox="0 0 60 60"
                  className="h-14 w-14 text-gold-deep transition-transform duration-700 group-hover:rotate-[18deg] group-hover:scale-125"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {p.icon}
                </svg>
                <h3 className="relative mt-6 inline-block font-luxe text-3xl font-medium text-amber-deep">
                  {p.title}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-deep transition-all duration-500 group-hover:w-full" />
                </h3>
                <p className="mt-4 font-light leading-[1.8]">{p.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-4 pb-16 sm:px-8">
        <Reveal from="zoom">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-amber-deep px-6 py-20 text-center text-sand-light">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 animate-ping-slow rounded-full border border-gold/40" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 animate-ping-slow rounded-full border border-gold/30 [animation-delay:1.2s]" aria-hidden="true" />

            <Lotus className="mx-auto mb-6 w-12 text-gold" />
            <h2 className="mx-auto max-w-[18ch] font-luxe text-4xl font-medium leading-tight sm:text-6xl">
              Find the scent that feels like you
            </h2>
            <p className="mx-auto mt-5 max-w-[44ch] font-light leading-relaxed text-[#e3d5b6]">
              Twelve blends, each rested for thirty days. Start with the one that is calling you.
            </p>

            <Link
              to="/collections"
              className="group relative mt-10 inline-block overflow-hidden border border-sand-light px-10 py-3 transition-colors duration-500 hover:text-amber-deep"
            >
              <span className="absolute inset-0 -translate-x-full bg-sand-light transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/20" />
              <span className="relative">Explore collections</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
