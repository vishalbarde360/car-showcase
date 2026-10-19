import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import PerfumeCard from '../PerfumeCard'
import { perfumes } from '../../data/perfumes'

const top = [...perfumes].sort((a, b) => b.rating - a.rating).slice(0, 4)

export default function Bestsellers() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-24 md:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <Reveal from="left">
          <p className="mb-2 text-sm font-light text-gold-deep">Most loved</p>
          <h2 className="font-luxe text-4xl font-medium text-amber-deep sm:text-6xl">Our top-rated scents</h2>
        </Reveal>
        <Reveal from="right">
          <Link to="/collections" className="group relative inline-flex items-center gap-2 pb-1 text-sm">
            View all perfumes
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold-deep transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        </Reveal>
      </div>

      <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {top.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 130}>
            <PerfumeCard perfume={p} />
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
