import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BottleArt from './BottleArt'
import ProductImage from './ProductImage'
import { productImages } from '../lib/productImages'
import { perfumes, formatPrice } from '../data/perfumes'

// The three scents the hero rotates through.
const slides = ['nilufer-original', 'midnight-oud', 'royal-saffron'].map((id) => perfumes.find((p) => p.id === id))
const INTERVAL = 6000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const [cycle, setCycle] = useState(0) // restarts the timer and progress bar
  const heroRef = useRef(null)

  const p = slides[active]
  const go = (i, d) => {
    setDir(d)
    setActive((i + slides.length) % slides.length)
  }

  // auto-advance
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => go(active + 1, 1), INTERVAL)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, cycle, paused])

  // layers drift against the mouse
  const onMove = (e) => {
    const r = heroRef.current.getBoundingClientRect()
    heroRef.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    heroRef.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }

  const imgId = active === 0 && productImages['hero-bottle'] ? 'hero-bottle' : p.id

  return (
    <div
      ref={heroRef}
      className="hero"
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false)
        setCycle((c) => c + 1)
      }}
    >
      {/* lotus mark draws itself */}
      <svg className="hero__lotus" viewBox="0 0 60 44" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          {['M30 40C22 32 22 14 30 4c8 10 8 28 0 36Z', 'M30 40C18 38 8 28 6 14c12 2 20 12 24 26Z', 'M30 40c12-2 22-12 24-26-12 2-20 12-24 26Z'].map((d, i) => (
            <path key={i} d={d} pathLength="1" className="animate-draw" style={{ strokeDasharray: 1, animationDelay: `${300 + i * 350}ms` }} />
          ))}
        </g>
      </svg>

      <h1 className="hero__word" aria-label="Nilufer">
        <span aria-hidden="true">NILUFER</span>
      </h1>

      <div key={active} className="hero__bottle" style={{ '--bx': `${dir * 70}px` }}>
        <ProductImage
          id={imgId}
          alt={p.name}
          fallback={<BottleArt shape={p.shape} liquid={p.liquid} glass={p.glass} cap={p.cap} name={p.name.split(' ')[0]} />}
        />
      </div>

      <button className="hero__arrow hero__arrow--l" aria-label="Previous scent" onClick={() => go(active - 1, -1)}>
        <svg width="8" height="10" viewBox="0 0 8 10"><path d="M8 0 0 5l8 5V0Z" fill="currentColor" /></svg>
      </button>
      <button className="hero__arrow hero__arrow--r" aria-label="Next scent" onClick={() => go(active + 1, 1)}>
        <svg width="8" height="10" viewBox="0 0 8 10"><path d="M0 0l8 5-8 5V0Z" fill="currentColor" /></svg>
      </button>

      <p key={'c' + active} className="hero__copy animate-rise" aria-live="polite">
        {p.blurb} {p.notes.top}, {p.notes.heart} and {p.notes.base}.
      </p>

      <div className="hero__buy">
        <span key={'n' + active} className="animate-rise font-luxe text-2xl font-medium">{p.name}</span>
        <span key={'p' + active} className="hero__price animate-rise" style={{ animationDelay: '80ms' }}>
          {formatPrice(p.price)} <span className="text-xs font-light tracking-normal">/ 100 ml</span>
        </span>
        <Link to={`/perfume/${p.id}`} className="btn">Discover</Link>
      </div>

      <div className="hero__side" aria-hidden="true">
        <span className="hero__ring" />
        <span className="hero__ring" />
      </div>

      <div className="hero__progress" role="tablist" aria-label="Scents">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === active}
            aria-label={s.name}
            className={'hero__bar' + (i === active ? ' is-active' : '')}
            onClick={() => {
              go(i, i > active ? 1 : -1)
              setCycle((c) => c + 1)
            }}
          >
            {i === active && <span key={`${active}-${cycle}`} className="hero__fill" />}
          </button>
        ))}
      </div>
    </div>
  )
}
