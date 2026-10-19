import { useScroll } from '../hooks/useScroll'

const C = 2 * Math.PI * 20

// Thin progress bar on top and a "back to top" button with a progress ring.
export default function ScrollUI() {
  const { y, progress } = useScroll()
  const show = y > 600

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]" aria-hidden="true">
        <div className="h-full origin-left bg-gradient-to-r from-gold to-gold-deep" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={show ? 0 : -1}
        className={
          'group fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-sand-light/90 text-amber-deep shadow-[0_14px_30px_-12px_rgba(70,45,15,0.6)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-amber-deep hover:text-sand-light ' +
          (show ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-6 scale-75 opacity-0')
        }
      >
        <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          <circle cx="24" cy="24" r="20" fill="none" stroke="#a47c34" strokeWidth="2" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}
