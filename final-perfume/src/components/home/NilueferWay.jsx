import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import { useInView } from '../../hooks/useInView'

const features = [
  { title: 'Small batches', text: 'Every blend is poured in small numbers, so each bottle gets our full attention.', d: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z' },
  { title: 'Thirty days of rest', text: 'Each blend sleeps in dark glass so its notes can settle into one calm, round scent.', d: 'M20 14.500A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.500Z' },
  { title: 'Natural oils first', text: 'We start with natural oils and use synthetics only where they help a scent last.', d: 'M5 19c0-8 5-14 14-14 0 9-6 14-14 14Zm0 0 7-7' },
  { title: 'Finished by hand', text: 'Poured, capped and labelled by hand, and checked one bottle at a time.', d: 'M12 3l1.8 5.200L19 10l-5.2 1.800L12 17l-1.8-5.200L5 10l5.2-1.800L12 3Zm7 12v4m-2-2h4' },
]

function DrawIcon({ d }) {
  const [ref, inView] = useInView(0.6)
  return (
    <span ref={ref} className="relative grid h-16 w-16 place-items-center rounded-full border border-gold-deep/40 bg-sand-light transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-amber-deep group-hover:text-gold">
      <span className="absolute inset-0 animate-ping-slow rounded-full border border-gold/50" />
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-gold-deep transition-colors duration-500 group-hover:text-gold" aria-hidden="true">
        <path d={d} pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: inView ? 0 : 1, transition: 'stroke-dashoffset 1.8s ease-out' }} />
      </svg>
    </span>
  )
}

export default function NilueferWay() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-28 md:px-10">
      <div className="grid items-start gap-14 lg:grid-cols-[4fr_7fr]">
        <Reveal from="left">
          <p className="mb-2 text-sm font-light text-gold-deep">Why Nilufer</p>
          <h2 className="font-luxe text-4xl font-medium leading-tight text-amber-deep sm:text-6xl">A scent should never be hurried</h2>
          <p className="mt-5 max-w-[40ch] font-light leading-[1.85]">We keep our process slow on purpose. It is the difference you can smell the moment the bottle opens.</p>
          <Link to="/about" className="group relative mt-8 inline-flex items-center gap-2 pb-1 text-sm">
            Read our story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold-deep transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} from="up" delay={i * 140}>
              <div className="group h-full rounded-2xl border border-gold/40 bg-sand-light/70 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-gold-deep/60 hover:shadow-[0_26px_40px_-22px_rgba(90,36,16,0.5)]">
                <DrawIcon d={f.d} />
                <h3 className="mt-5 font-luxe text-3xl font-medium text-amber-deep">{f.title}</h3>
                <span className="mt-3 block h-px w-10 bg-gold-deep transition-all duration-500 group-hover:w-24" />
                <p className="mt-4 text-sm font-light leading-[1.8]">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
