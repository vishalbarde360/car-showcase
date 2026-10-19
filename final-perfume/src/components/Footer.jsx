import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'
import { categories } from './Navbar'

const WORD = 'NILUFER'

function FooterLink({ to, href, children }) {
  const cls = 'group relative inline-block py-1 text-sm font-light text-sand-light/80 transition-all duration-300 hover:translate-x-1 hover:text-sand-light'
  const line = <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
  return to ? (
    <Link to={to} className={cls}>{children}{line}</Link>
  ) : (
    <a href={href} className={cls}>{children}{line}</a>
  )
}

// Placeholder contact details. Replace with your own.
export default function Footer() {
  const [ref, inView] = useInView(0.2)

  return (
    <footer className="relative mt-24 overflow-hidden bg-amber-deep text-sand-light">
      {/* soft glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[60%] -translate-x-1/2 animate-glow rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <Reveal>
            <svg viewBox="0 0 60 44" className="w-12 text-gold" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <path d="M30 40C22 32 22 14 30 4c8 10 8 28 0 36Z" />
                <path d="M30 40C18 38 8 28 6 14c12 2 20 12 24 26Z" />
                <path d="M30 40c12-2 22-12 24-26-12 2-20 12-24 26Z" />
              </g>
            </svg>
            <p className="mt-5 max-w-[30ch] text-sm font-light leading-[1.8] text-sand-light/80">
              Small-batch eau de parfum, poured by hand and rested for thirty days before it reaches you.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-luxe text-2xl font-medium text-gold">Shop</h3>
            <ul className="mt-3 space-y-1">
              <li><FooterLink to="/collections">All perfumes</FooterLink></li>
              {categories.map((c) => (
                <li key={c.slug}><FooterLink to={`/category/${c.slug}`}>{c.label}</FooterLink></li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <h3 className="font-luxe text-2xl font-medium text-gold">Nilufer</h3>
            <ul className="mt-3 space-y-1">
              <li><FooterLink to="/about">Our story</FooterLink></li>
              <li><FooterLink to="/favorites">Favorites</FooterLink></li>
              <li><FooterLink to="/contact">Contact</FooterLink></li>
            </ul>
          </Reveal>

          <Reveal delay={360}>
            <h3 className="font-luxe text-2xl font-medium text-gold">Say hello</h3>
            <ul className="mt-3 space-y-1">
              <li><FooterLink href="mailto:hello@nilufer.in">hello@nilufer.in</FooterLink></li>
              <li><FooterLink href="tel:+919876543210">+91 98765 43210</FooterLink></li>
              <li className="py-1 text-sm font-light text-sand-light/80">Mon to Sat, 10 am to 7 pm</li>
            </ul>
          </Reveal>
        </div>

        {/* big wordmark */}
        <div ref={ref} className="mt-16 select-none text-center" aria-hidden="true">
          <div className="flex justify-center overflow-hidden font-luxe text-[clamp(4rem,19vw,15rem)] font-medium leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(201,164,92,0.55)]">
            {[...WORD].map((ch, i) => (
              <span
                key={i}
                className={'inline-block transition-all duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:text-gold/70 ' + (inView ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0')}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-sand-light/15 py-7 text-xs font-light text-sand-light/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Nilufer Eau de Parfum. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold"
          >
            Back to top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
