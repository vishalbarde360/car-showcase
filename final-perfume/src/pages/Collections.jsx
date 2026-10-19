import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import Petals from '../components/Petals'
import PerfumeCard from '../components/PerfumeCard'
import { categories } from '../components/Navbar'
import { perfumes, sortOptions } from '../data/perfumes'

const filters = [{ slug: 'all', label: 'All' }, ...categories]

/* --------------------------- sort dropdown --------------------------- */

function SortMenu({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const current = sortOptions.find((o) => o.value === value)

  useEffect(() => {
    const close = (e) => {
      if (!box.current?.contains(e.target)) setOpen(false)
    }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [])

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="group flex min-w-[220px] items-center justify-between gap-4 border border-gold-deep/50 bg-sand-light/60 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-gold-deep hover:bg-sand-light"
      >
        <span>
          <span className="font-light">Sort: </span>
          {current.label}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" className={'transition-transform duration-300 ' + (open ? 'rotate-180' : '')} aria-hidden="true">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <ul
        role="listbox"
        className={
          'absolute right-0 z-30 mt-2 w-full origin-top overflow-hidden border border-gold-deep/40 bg-sand-light shadow-[0_24px_40px_-18px_rgba(70,45,15,0.5)] transition-all duration-300 ' +
          (open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0')
        }
      >
        {sortOptions.map((o, i) => (
          <li key={o.value} role="option" aria-selected={o.value === value}>
            <button
              type="button"
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={
                'flex w-full items-center justify-between px-5 py-2.5 text-left text-sm transition-all duration-300 hover:bg-gold/20 hover:pl-7 ' +
                (open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0') +
                (o.value === value ? ' text-gold-deep' : '')
              }
            >
              {o.label}
              {o.value === value && <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------- page ------------------------------- */

export default function Collections() {
  const [params, setParams] = useSearchParams()
  const category = filters.some((f) => f.slug === params.get('category')) ? params.get('category') : 'all'
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')

  const heroRef = useRef(null)
  const glowRef = useRef(null)

  // sliding indicator behind the active filter pill
  const pillRefs = useRef({})
  const [ind, setInd] = useState({ left: 0, width: 0 })
  useLayoutEffect(() => {
    const measure = () => {
      const el = pillRefs.current[category]
      if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [category])

  const counts = useMemo(() => {
    const c = { all: perfumes.length }
    categories.forEach((cat) => (c[cat.slug] = perfumes.filter((p) => p.categories.includes(cat.slug)).length))
    return c
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = perfumes.filter(
      (p) =>
        (category === 'all' || p.categories.includes(category)) &&
        (!q || p.name.toLowerCase().includes(q) || Object.values(p.notes).some((n) => n.toLowerCase().includes(q))),
    )
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  }, [category, sort, query])

  const setCategory = (slug) => setParams(slug === 'all' ? {} : { category: slug })
  const clearAll = () => {
    setQuery('')
    setCategory('all')
    setSort('featured')
  }

  const onHeroMove = (e) => {
    const r = heroRef.current.getBoundingClientRect()
    glowRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    glowRef.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const gridKey = `${category}|${sort}|${query}`

  return (
    <div className="text-ink">
      {/* ============ HEADER ============ */}
      <section ref={heroRef} onMouseMove={onHeroMove} className="relative overflow-hidden px-6 pb-14 pt-16 text-center md:px-10">
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_300px_at_var(--mx,50%)_var(--my,30%),rgba(201,164,92,0.25),transparent)]"
        />
        <Petals />

        <p className="relative mb-5 animate-rise text-sm font-light" style={{ animationDelay: '100ms' }}>
          <Link to="/" className="group inline-block">
            Home
            <span className="block h-px w-0 bg-gold-deep transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="mx-2 text-gold-deep">/</span>
          Collections
        </p>

        <h1 className="relative font-luxe text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.95] text-gold-deep">
          <SplitText text="The collection" delay={250} />
        </h1>
        <p className="relative mx-auto mt-6 max-w-[50ch] animate-rise font-light leading-relaxed" style={{ animationDelay: '1000ms' }}>
          Twelve blends, each rested for thirty days. Filter by mood, sort by what matters to you, and meet your next scent.
        </p>
      </section>

      {/* ============ TOOLBAR ============ */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-5 border-y border-gold/40 py-6 lg:flex-row lg:items-center lg:justify-between">
            {/* filter pills */}
            <div className="-mx-1 overflow-x-auto px-1 pb-1 lg:pb-0">
              <div role="tablist" aria-label="Categories" className="relative inline-flex">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 rounded-full bg-amber-deep shadow-[0_10px_20px_-8px_rgba(90,36,16,0.6)] transition-all duration-500 ease-[cubic-bezier(0.3,1.3,0.5,1)]"
                  style={{ left: ind.left, width: ind.width }}
                />
                {filters.map((f) => {
                  const active = f.slug === category
                  return (
                    <button
                      key={f.slug}
                      ref={(el) => (pillRefs.current[f.slug] = el)}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setCategory(f.slug)}
                      className={
                        'relative z-10 flex shrink-0 items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors duration-300 ' +
                        (active ? 'text-sand-light' : 'hover:text-gold-deep')
                      }
                    >
                      {f.label}
                      <span className={'text-xs transition-colors duration-300 ' + (active ? 'text-gold' : 'text-ink/50')}>{counts[f.slug]}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* search */}
              <label className="group relative block">
                <span className="sr-only">Search perfumes</span>
                <svg className="absolute left-0 top-1/2 -translate-y-1/2 text-gold-deep transition-transform duration-300 group-focus-within:scale-110" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name or note"
                  className="w-full border-b border-gold-deep/40 bg-transparent py-2.5 pl-7 pr-2 text-sm outline-none placeholder:font-light placeholder:text-ink/50 sm:w-56"
                />
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold-deep transition-all duration-500 group-focus-within:w-full" />
              </label>

              <SortMenu value={sort} onChange={setSort} />
            </div>
          </div>
        </Reveal>

        <p className="mt-5 text-sm font-light" aria-live="polite">
          Showing{' '}
          <span key={visible.length} className="inline-block animate-bump font-normal text-gold-deep">
            {visible.length}
          </span>{' '}
          {visible.length === 1 ? 'perfume' : 'perfumes'}
        </p>
      </section>

      {/* ============ GRID ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-10">
        {visible.length > 0 ? (
          <ul key={gridKey} className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal as="li" key={p.id} from="up" delay={(i % 4) * 110}>
                <PerfumeCard perfume={p} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="mx-auto flex max-w-md animate-rise flex-col items-center py-20 text-center">
            <svg viewBox="0 0 60 44" className="w-16 animate-float text-gold" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M30 40C22 32 22 14 30 4c8 10 8 28 0 36Z" />
                <path d="M30 40C18 38 8 28 6 14c12 2 20 12 24 26Z" />
                <path d="M30 40c12-2 22-12 24-26-12 2-20 12-24 26Z" />
              </g>
            </svg>
            <h2 className="mt-6 font-luxe text-4xl font-medium text-amber-deep">No perfumes found</h2>
            <p className="mt-3 font-light leading-relaxed">Nothing matches “{query}” in this category. Try another word or clear the filters.</p>
            <button
              type="button"
              onClick={clearAll}
              className="group relative mt-8 overflow-hidden border border-ink px-8 py-2.5 text-sm transition-colors duration-500 hover:text-sand-light"
            >
              <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Clear filters</span>
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
