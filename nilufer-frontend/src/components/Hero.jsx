import { useState } from 'react'
import { Link } from 'react-router-dom'
import PerfumeBottle from './PerfumeBottle'
import ProductImage from './ProductImage'

const slides = [1, 2, 3]

export default function Hero() {
  const [active, setActive] = useState(0)

  return (
    <div className="hero">
          {/* lotus mark */}
          <svg className="hero__lotus" viewBox="0 0 60 44" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M30 40C22 32 22 14 30 4c8 10 8 28 0 36Z" />
              <path d="M30 40C18 38 8 28 6 14c12 2 20 12 24 26Z" />
              <path d="M30 40c12-2 22-12 24-26-12 2-20 12-24 26Z" />
            </g>
          </svg>

          <h1 className="hero__word" aria-label="Nilufer">
            <span aria-hidden="true">NILUFER</span>
          </h1>

          <div className="hero__bottle">
            <ProductImage id="hero-bottle" alt="Nilufer eau de parfum" fallback={<PerfumeBottle />} />
          </div>

          <button className="hero__arrow hero__arrow--l" aria-label="Previous scent" onClick={() => setActive((a) => (a + slides.length - 1) % slides.length)}>
            <svg width="8" height="10" viewBox="0 0 8 10"><path d="M8 0 0 5l8 5V0Z" fill="currentColor" /></svg>
          </button>
          <button className="hero__arrow hero__arrow--r" aria-label="Next scent" onClick={() => setActive((a) => (a + 1) % slides.length)}>
            <svg width="8" height="10" viewBox="0 0 8 10"><path d="M0 0l8 5-8 5V0Z" fill="currentColor" /></svg>
          </button>

          <p className="hero__copy">
            A warm blend of amber, oud and white lotus. Made in small batches and
            rested for thirty days before it reaches you.
          </p>

          <div className="hero__buy">
            <span className="hero__price">MRP ₹3,200</span>
            <Link to="/collections" className="btn">Get now</Link>
          </div>

          <div className="hero__side" aria-hidden="true">
            <span className="hero__ring" />
            <span className="hero__ring" />
          </div>

          <div className="hero__progress" role="tablist" aria-label="Scents">
            {slides.map((s, i) => (
              <button
                key={s}
                role="tab"
                aria-selected={i === active}
                aria-label={`Scent ${s}`}
                className={'hero__bar' + (i === active ? ' is-active' : '')}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
    </div>
  )
}
