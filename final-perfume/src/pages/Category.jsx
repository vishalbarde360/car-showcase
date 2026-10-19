import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import Petals from '../components/Petals'
import PerfumeCard from '../components/PerfumeCard'
import { categories } from '../components/Navbar'
import { perfumes, categoryInfo } from '../data/perfumes'

export default function Category() {
  const { slug } = useParams()
  const cat = categories.find((c) => c.slug === slug)
  const info = categoryInfo[slug]

  if (!cat) {
    return (
      <section className="mx-auto flex max-w-md animate-rise flex-col items-center px-6 py-24 text-center">
        <h1 className="font-luxe text-5xl font-medium text-amber-deep">Category not found</h1>
        <p className="mt-4 font-light">We could not find “{slug}”. Try one of these instead.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`} className="rounded-full border border-gold-deep/50 px-4 py-1.5 text-sm transition-colors hover:bg-gold/20">
              {c.label}
            </Link>
          ))}
        </div>
      </section>
    )
  }

  const list = perfumes.filter((p) => p.categories.includes(slug))

  return (
    <div key={slug} className="text-ink">
      <section className="relative overflow-hidden px-6 pb-12 pt-16 text-center md:px-10">
        <Petals />
        <p className="relative mb-5 animate-rise text-sm font-light" style={{ animationDelay: '100ms' }}>
          <Link to="/" className="group inline-block">
            Home
            <span className="block h-px w-0 bg-gold-deep transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="mx-2 text-gold-deep">/</span>
          <Link to="/collections" className="group inline-block">
            Collections
            <span className="block h-px w-0 bg-gold-deep transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="mx-2 text-gold-deep">/</span>
          {cat.label}
        </p>
        <h1 className="relative font-luxe text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.95] text-gold-deep">
          <SplitText text={info.title} delay={250} />
        </h1>
        <p className="relative mx-auto mt-6 max-w-[52ch] animate-rise font-light leading-relaxed" style={{ animationDelay: '900ms' }}>
          {info.text}
        </p>

        <div className="relative mt-8 flex animate-rise flex-wrap justify-center gap-2" style={{ animationDelay: '1100ms' }}>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              aria-current={c.slug === slug ? 'page' : undefined}
              className={
                'rounded-full border px-5 py-1.5 text-sm transition-all duration-300 hover:-translate-y-0.5 ' +
                (c.slug === slug ? 'border-amber-deep bg-amber-deep text-sand-light' : 'border-gold-deep/40 hover:border-gold-deep hover:bg-gold/20')
              }
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <p className="mb-8 border-y border-gold/40 py-4 text-sm font-light">
          <span className="font-normal text-gold-deep">{list.length}</span> {list.length === 1 ? 'perfume' : 'perfumes'} in {cat.label}
        </p>
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 110}>
              <PerfumeCard perfume={p} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-14 text-center">
          <Link to="/collections" className="group relative inline-block text-sm">
            View the full collection
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold-deep transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
