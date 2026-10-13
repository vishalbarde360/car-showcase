import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import Petals from '../components/Petals'
import TiltCard from '../components/TiltCard'
import BottleArt from '../components/BottleArt'
import ProductImage from '../components/ProductImage'
import PerfumeCard, { Stars, heartPath } from '../components/PerfumeCard'
import { useInView } from '../hooks/useInView'
import { useFavorites } from '../context/FavoritesContext'
import { perfumes, sizes, priceFor, formatPrice, longevityLabels, projectionLabels } from '../data/perfumes'

function Meter({ label, value, hint }) {
  const [ref, inView] = useInView(0.5)
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between text-sm">
        <span>{label}</span>
        <span className="font-light">{hint}</span>
      </div>
      <div className="mt-3 flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="h-2 flex-1 overflow-hidden rounded-full bg-gold/25">
            <span
              className={'block h-full origin-left rounded-full bg-gradient-to-r from-gold to-gold-deep transition-transform duration-700 ' + (inView && i <= value ? 'scale-x-100' : 'scale-x-0')}
              style={{ transitionDelay: `${i * 130}ms` }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

function Details({ p }) {
  const { isFav, toggle } = useFavorites()
  const liked = isFav(p.id)
  const [burst, setBurst] = useState(0)
  const [size, setSize] = useState(sizes[2])

  // sliding highlight behind the selected size
  const pillRefs = useRef({})
  const [ind, setInd] = useState({ left: 0, width: 0 })
  useLayoutEffect(() => {
    const el = pillRefs.current[size.ml]
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth })
  }, [size])

  const related = perfumes.filter((x) => x.id !== p.id && x.categories.some((c) => p.categories.includes(c))).slice(0, 4)
  const price = priceFor(p, size)
  const stages = [
    { label: 'Top notes', when: 'First 15 minutes', note: p.notes.top, w: 'w-1/3' },
    { label: 'Heart notes', when: '2 to 4 hours', note: p.notes.heart, w: 'w-2/3' },
    { label: 'Base notes', when: '6 hours and beyond', note: p.notes.base, w: 'w-full' },
  ]

  return (
    <div className="text-ink">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl animate-rise px-6 pt-10 text-sm font-light md:px-10">
        <Link to="/" className="hover:text-gold-deep">Home</Link>
        <span className="mx-2 text-gold-deep">/</span>
        <Link to="/collections" className="hover:text-gold-deep">Collections</Link>
        <span className="mx-2 text-gold-deep">/</span>
        <span className="font-normal">{p.name}</span>
      </nav>

      {/* ============ MAIN ============ */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-10 md:grid-cols-2 md:px-10 lg:gap-20">
        <Reveal from="left">
          <TiltCard>
            <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-gold/40" style={{ background: `radial-gradient(circle at 50% 55%, ${p.liquid[0]}55, transparent 68%), linear-gradient(180deg,#f3ead2,#e6d7b8)` }}>
              <Petals />
              <svg viewBox="0 0 300 300" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
                <defs>
                  <path id="dring" d="M150,150 m-125,0 a125,125 0 1,1 250,0 a125,125 0 1,1 -250,0" />
                </defs>
                <text className="fill-gold-deep" fontSize="12" letterSpacing="4">
                  <textPath href="#dring" textLength="770" lengthAdjust="spacing">
                    Hand poured - rested thirty days - eau de parfum -{' '}
                  </textPath>
                </text>
              </svg>
              <span className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 animate-ping-slow rounded-full border border-gold-deep/40" />
              <span className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-gold/30 blur-3xl" />

              <div className="absolute left-1/2 top-1/2 h-[66%] -translate-x-1/2 -translate-y-1/2 animate-float">
                <ProductImage
                  id={p.id}
                  alt={p.name}
                  fallback={
                    <div className="aspect-[220/380] h-full">
                      <BottleArt shape={p.shape} liquid={p.liquid} glass={p.glass} cap={p.cap} name={p.name.split(' ')[0]} />
                    </div>
                  }
                />
              </div>
              {p.tag && (
                <span className="absolute left-5 top-5 overflow-hidden rounded-full bg-amber-deep px-4 py-1.5 text-xs text-sand-light">
                  <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/25" />
                  <span className="relative">{p.tag}</span>
                </span>
              )}
            </div>
          </TiltCard>
        </Reveal>

        <div>
          <h1 className="font-luxe text-[clamp(2.8rem,6vw,4.8rem)] font-medium leading-[0.98] text-gold-deep">
            <SplitText text={p.name} delay={200} step={35} />
          </h1>

          <Reveal delay={400} className="mt-5 flex flex-wrap items-center gap-3">
            {p.categories.map((c) => (
              <Link key={c} to={`/category/${c}`} className="rounded-full border border-gold-deep/40 px-4 py-1 text-xs capitalize transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/20">
                {c}
              </Link>
            ))}
            <span className="group"><Stars value={p.rating} /></span>
          </Reveal>

          <Reveal delay={550}>
            <p className="mt-6 max-w-[54ch] font-light leading-[1.85]">{p.description}</p>
          </Reveal>

          <Reveal delay={700} className="mt-8">
            <p className="mb-3 text-sm">Size</p>
            <div className="relative inline-flex rounded-full border border-gold-deep/40 p-1">
              <span
                aria-hidden="true"
                className="absolute inset-y-1 rounded-full bg-amber-deep transition-all duration-500 ease-[cubic-bezier(0.3,1.3,0.5,1)]"
                style={{ left: ind.left, width: ind.width }}
              />
              {sizes.map((s) => (
                <button
                  key={s.ml}
                  ref={(el) => (pillRefs.current[s.ml] = el)}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={s.ml === size.ml}
                  className={'relative z-10 rounded-full px-6 py-2 text-sm transition-colors duration-300 ' + (s.ml === size.ml ? 'text-sand-light' : 'hover:text-gold-deep')}
                >
                  {s.ml} ml
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={850} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <div key={price} className="animate-bump font-luxe text-5xl font-medium">{formatPrice(price)}</div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                {burst > 0 && liked && <span key={burst} className="pointer-events-none absolute inset-0 animate-burst border border-gold-deep" />}
                <button
                  type="button"
                  onClick={() => {
                    toggle(p)
                    if (!liked) setBurst((b) => b + 1)
                  }}
                  aria-pressed={liked}
                  className={
                    'group/btn relative overflow-hidden border px-7 py-3 text-sm transition-colors duration-500 ' +
                    (liked ? 'border-amber-deep text-sand-light' : 'border-ink hover:text-sand-light')
                  }
                >
                  <span className={'absolute inset-0 transition-transform duration-500 ease-out ' + (liked ? 'translate-x-0 bg-amber-deep' : '-translate-x-full bg-ink group-hover/btn:translate-x-0')} />
                  <span className="relative inline-flex items-center gap-2">
                    <svg key={liked} width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={liked ? 'animate-bump text-gold' : ''} aria-hidden="true">
                      <path d={heartPath} />
                    </svg>
                    {liked ? 'In your favorites' : 'Add to favorites'}
                  </span>
                </button>
              </div>

              <Link to={`/contact?perfume=${p.id}`} className="group relative overflow-hidden px-2 py-3 text-sm">
                Enquire about this scent
                <span className="absolute bottom-2 left-2 h-px w-[calc(100%-1rem)] origin-left scale-x-0 bg-gold-deep transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ NOTES ============ */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Reveal className="mb-12 text-center">
          <h2 className="font-luxe text-4xl font-medium text-amber-deep sm:text-5xl">The scent story</h2>
          <p className="mx-auto mt-3 max-w-[44ch] font-light">How {p.name} unfolds on your skin, from the first spritz to the last trace.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {stages.map((s, i) => (
            <Reveal key={s.label} from="up" delay={i * 160}>
              <div className="group h-full rounded-2xl border border-gold/40 bg-sand-light/70 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-gold-deep/60 hover:shadow-[0_26px_40px_-22px_rgba(90,36,16,0.5)]">
                <p className="text-sm font-light">{s.label}</p>
                <h3 className="mt-2 font-luxe text-4xl font-medium text-amber-deep">{s.note}</h3>
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-gold/25">
                  <div className={'h-full rounded-full bg-gradient-to-r from-gold to-gold-deep transition-all duration-700 group-hover:brightness-110 ' + s.w} />
                </div>
                <p className="mt-3 text-xs font-light">{s.when}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ INGREDIENTS + PERFORMANCE ============ */}
      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-12 md:grid-cols-2 md:px-10">
        <div>
          <Reveal>
            <h2 className="font-luxe text-4xl font-medium text-amber-deep">Ingredients</h2>
          </Reveal>
          <ul className="mt-6 flex flex-wrap gap-3">
            {p.ingredients.map((ing, i) => (
              <Reveal as="li" key={ing} from="zoom" delay={i * 110}>
                <span className="inline-block cursor-default rounded-full border border-gold-deep/40 bg-sand-light/70 px-5 py-2 text-sm transition-all duration-300 hover:-translate-y-1 hover:rotate-[-2deg] hover:bg-gold/25">
                  {ing}
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={300}>
            <p className="mt-6 text-sm font-light leading-relaxed">Best season: {p.season.toLowerCase()}. Add your full ingredient list here before launch.</p>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h2 className="font-luxe text-4xl font-medium text-amber-deep">Performance</h2>
          </Reveal>
          <div className="mt-6 space-y-7">
            <Meter label="Longevity" value={p.longevity} hint={longevityLabels[p.longevity - 1]} />
            <Meter label="Projection" value={p.projection} hint={projectionLabels[p.projection - 1]} />
          </div>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-14 md:px-10">
          <Reveal className="mb-10 text-center">
            <h2 className="font-luxe text-4xl font-medium text-amber-deep sm:text-5xl">You may also like</h2>
          </Reveal>
          <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <Reveal as="li" key={r.id} delay={i * 110}>
                <PerfumeCard perfume={r} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default function PerfumeDetails() {
  const { id } = useParams()
  const p = perfumes.find((x) => x.id === id)

  if (!p) {
    return (
      <section className="mx-auto flex max-w-md animate-rise flex-col items-center px-6 py-24 text-center">
        <svg viewBox="0 0 60 44" className="w-16 animate-float text-gold" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M30 40C22 32 22 14 30 4c8 10 8 28 0 36Z" />
            <path d="M30 40C18 38 8 28 6 14c12 2 20 12 24 26Z" />
            <path d="M30 40c12-2 22-12 24-26-12 2-20 12-24 26Z" />
          </g>
        </svg>
        <h1 className="mt-6 font-luxe text-5xl font-medium text-amber-deep">Perfume not found</h1>
        <p className="mt-4 font-light">We could not find “{id}”. It may have been renamed or retired.</p>
        <Link to="/collections" className="group relative mt-8 overflow-hidden border border-ink px-8 py-2.5 text-sm transition-colors duration-500 hover:text-sand-light">
          <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative">Back to collections</span>
        </Link>
      </section>
    )
  }

  return <Details key={p.id} p={p} />
}
