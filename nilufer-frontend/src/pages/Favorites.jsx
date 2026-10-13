import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import Petals from '../components/Petals'
import PerfumeCard, { heartPath } from '../components/PerfumeCard'
import { useFavorites } from '../context/FavoritesContext'
import { perfumes } from '../data/perfumes'

export default function Favorites() {
  const { ids, clear } = useFavorites()
  const liked = ids.map((id) => perfumes.find((p) => p.id === id)).filter(Boolean)

  return (
    <div className="text-ink">
      <section className="relative overflow-hidden px-6 pb-12 pt-16 text-center md:px-10">
        <Petals />
        <p className="relative mb-5 animate-rise text-sm font-light" style={{ animationDelay: '100ms' }}>
          <Link to="/" className="group inline-block">
            Home
            <span className="block h-px w-0 bg-gold-deep transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="mx-2 text-gold-deep">/</span>
          Favorites
        </p>
        <h1 className="relative font-luxe text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.95] text-gold-deep">
          <SplitText text="Your favorites" delay={250} />
        </h1>
        <p className="relative mx-auto mt-6 max-w-[48ch] animate-rise font-light leading-relaxed" style={{ animationDelay: '900ms' }}>
          {liked.length > 0
            ? 'The scents you loved, saved in one place. They stay here the next time you visit.'
            : 'Tap the heart on any perfume to save it here.'}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        {liked.length > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between border-y border-gold/40 py-4 text-sm">
              <p aria-live="polite">
                <span key={liked.length} className="inline-block animate-bump font-normal text-gold-deep">{liked.length}</span>{' '}
                {liked.length === 1 ? 'perfume saved' : 'perfumes saved'}
              </p>
              <button type="button" onClick={clear} className="group relative">
                Clear all
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-deep transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {liked.map((p, i) => (
                <Reveal as="li" key={p.id} delay={(i % 4) * 110}>
                  <PerfumeCard perfume={p} />
                </Reveal>
              ))}
            </ul>
          </>
        ) : (
          <div className="mx-auto flex max-w-md animate-rise flex-col items-center py-16 text-center">
            <div className="relative grid h-28 w-28 place-items-center">
              <span className="absolute inset-0 animate-ping-slow rounded-full border border-gold-deep/40" />
              <span className="absolute inset-3 animate-glow rounded-full bg-gold/25 blur-xl" />
              <svg viewBox="0 0 24 24" className="relative h-14 w-14 animate-float text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" aria-hidden="true">
                <path d={heartPath} pathLength="1" strokeDasharray="1" className="animate-draw" />
              </svg>
            </div>
            <h2 className="mt-8 font-luxe text-4xl font-medium text-amber-deep">Nothing saved yet</h2>
            <p className="mt-3 font-light leading-relaxed">Browse the collection and press Like on the scents that catch your eye.</p>
            <Link
              to="/collections"
              className="group relative mt-8 overflow-hidden border border-ink px-8 py-2.5 text-sm transition-colors duration-500 hover:text-sand-light"
            >
              <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Browse collections</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
