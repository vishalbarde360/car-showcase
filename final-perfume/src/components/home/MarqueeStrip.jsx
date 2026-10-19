const items = ['Eau de parfum', 'Hand poured', 'Rested thirty days', 'Small batches', 'Natural oils first', 'Finished by hand']

function Mark() {
  return (
    <svg viewBox="0 0 60 44" className="mx-8 h-6 w-6 shrink-0 animate-spin-slow text-gold [animation-duration:12s]" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M30 40C22 32 22 14 30 4c8 10 8 28 0 36Z" />
        <path d="M30 40C18 38 8 28 6 14c12 2 20 12 24 26Z" />
        <path d="M30 40c12-2 22-12 24-26-12 2-20 12-24 26Z" />
      </g>
    </svg>
  )
}

// Dark band under the hero with slowly scrolling brand phrases.
export default function MarqueeStrip() {
  return (
    <section aria-label="Our promise" className="group relative overflow-hidden bg-amber-deep py-5 text-sand-light">
      <div className="flex w-max animate-marquee [animation-duration:32s] group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center">
            <span className="font-luxe text-3xl font-medium italic transition-colors duration-300 hover:text-gold">{t}</span>
            <Mark />
          </div>
        ))}
      </div>
    </section>
  )
}
