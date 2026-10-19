import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import PillGroup from '../PillGroup'
import BottleArt from '../BottleArt'
import ProductImage from '../ProductImage'
import Petals from '../Petals'
import { heartPath } from '../PerfumeCard'
import { useFavorites } from '../../context/FavoritesContext'
import { perfumes, formatPrice } from '../../data/perfumes'

const moods = [
  { id: 'fresh', label: 'Fresh' },
  { id: 'floral', label: 'Floral' },
  { id: 'warm', label: 'Warm' },
  { id: 'woody', label: 'Woody' },
]
const strengths = [
  { id: 'soft', label: 'Soft', test: (p) => p.projection <= 2 },
  { id: 'balanced', label: 'Balanced', test: (p) => p.projection === 3 },
  { id: 'bold', label: 'Bold', test: (p) => p.projection >= 4 },
]

export default function ScentFinder() {
  const [mood, setMood] = useState('floral')
  const [strength, setStrength] = useState('balanced')
  const { isFav, toggle } = useFavorites()

  const rec = useMemo(() => {
    const test = strengths.find((s) => s.id === strength).test
    return perfumes
      .map((p) => ({ p, score: (p.moods.includes(mood) ? 2 : 0) + (test(p) ? 1 : 0) + p.rating / 10 }))
      .sort((a, b) => b.score - a.score)[0].p
  }, [mood, strength])

  const liked = isFav(rec.id)

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-28 md:px-10">
      <Reveal from="zoom">
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-sand-light to-sand p-7 sm:p-12">
          <Petals />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* questions */}
            <div>
              <p className="mb-2 text-sm font-light text-gold-deep">Scent finder</p>
              <h2 className="font-luxe text-4xl font-medium leading-tight text-amber-deep sm:text-5xl">Not sure where to start?</h2>
              <p className="mt-4 max-w-[44ch] font-light leading-relaxed">Answer two quick questions and we will point you to the blend that suits you best.</p>

              <div className="mt-8">
                <p className="mb-3 text-sm">1. Which mood do you love?</p>
                <PillGroup label="Mood" options={moods} value={mood} onChange={setMood} />
              </div>
              <div className="mt-7">
                <p className="mb-3 text-sm">2. How noticeable should it be?</p>
                <PillGroup label="Strength" options={strengths} value={strength} onChange={setStrength} />
              </div>
            </div>

            {/* result */}
            <div key={rec.id} className="animate-rise">
              <div className="relative mx-auto grid max-w-sm place-items-center">
                <div className="relative grid h-[22rem] w-full place-items-center overflow-hidden rounded-[2rem] border border-gold/40" style={{ background: `radial-gradient(circle at 50% 58%, ${rec.liquid[0]}55, transparent 66%), linear-gradient(180deg,#f6eed8,#ead9b8)` }}>
                  <span className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 animate-ping-slow rounded-full border border-gold-deep/40" />
                  <div className="relative h-60 animate-float">
                    <ProductImage
                      id={rec.id}
                      alt={rec.name}
                      fallback={
                        <div className="aspect-[220/380] h-full">
                          <BottleArt shape={rec.shape} liquid={rec.liquid} glass={rec.glass} cap={rec.cap} name={rec.name.split(' ')[0]} />
                        </div>
                      }
                    />
                  </div>
                  <span className="absolute left-4 top-4 overflow-hidden rounded-full bg-amber-deep px-4 py-1.5 text-xs text-sand-light">
                    <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/25" />
                    <span className="relative">Your match</span>
                  </span>
                </div>

                <div className="mt-6 w-full text-center">
                  <h3 className="font-luxe text-4xl font-medium text-amber-deep">{rec.name}</h3>
                  <p className="mt-2 text-sm font-light">{rec.blurb}</p>
                  <p className="mt-2 text-xs font-light text-gold-deep">{rec.notes.top}, {rec.notes.heart}, {rec.notes.base}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <span className="font-luxe text-3xl font-medium">{formatPrice(rec.price)}</span>
                    <Link to={`/perfume/${rec.id}`} className="group relative overflow-hidden border border-ink px-6 py-2 text-sm transition-colors duration-500 hover:text-sand-light">
                      <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-out group-hover:translate-x-0" />
                      <span className="relative">View details</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggle(rec)}
                      aria-pressed={liked}
                      aria-label={liked ? `Remove ${rec.name} from favorites` : `Add ${rec.name} to favorites`}
                      className={'grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:scale-110 active:scale-90 ' + (liked ? 'border-amber-deep bg-amber-deep text-gold' : 'border-gold-deep/50 text-gold-deep')}
                    >
                      <svg key={liked} width="17" height="17" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={liked ? 'animate-bump' : ''} aria-hidden="true">
                        <path d={heartPath} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
