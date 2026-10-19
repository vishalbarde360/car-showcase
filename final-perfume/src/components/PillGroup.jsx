import { useLayoutEffect, useRef, useState } from 'react'

// Row of pills with a highlight that slides to the selected one.
export default function PillGroup({ label, options, value, onChange }) {
  const refs = useRef({})
  const [ind, setInd] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[value]
      if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [value])

  return (
    <div role="radiogroup" aria-label={label} className="relative inline-flex flex-wrap rounded-full border border-gold-deep/40 p-1">
      <span
        aria-hidden="true"
        className="absolute inset-y-1 rounded-full bg-amber-deep shadow-[0_10px_18px_-8px_rgba(90,36,16,0.7)] transition-all duration-500 ease-[cubic-bezier(0.3,1.3,0.5,1)]"
        style={{ left: ind.left, width: ind.width }}
      />
      {options.map((o) => (
        <button
          key={o.id}
          ref={(el) => (refs.current[o.id] = el)}
          type="button"
          role="radio"
          aria-checked={o.id === value}
          onClick={() => onChange(o.id)}
          className={'relative z-10 rounded-full px-5 py-2 text-sm transition-colors duration-300 ' + (o.id === value ? 'text-sand-light' : 'hover:text-gold-deep')}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
