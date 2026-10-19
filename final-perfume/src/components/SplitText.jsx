// Letters rise one by one from behind a mask. Plays on page load.
export default function SplitText({ text, className = '', delay = 0, step = 40 }) {
  const words = text.split(' ')
  let n = 0

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block overflow-hidden whitespace-nowrap pb-[0.14em] align-bottom">
          {[...word].map((ch, ci) => {
            const d = delay + n++ * step
            return (
              <span key={ci} className="inline-block animate-rise" style={{ animationDelay: `${d}ms` }}>
                {ch}
              </span>
            )
          })}
          {wi < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  )
}
