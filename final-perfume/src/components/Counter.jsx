import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

// Counts from 0 to `to` when it scrolls into view.
export default function Counter({ to, suffix = '', duration = 1800 }) {
  const [ref, inView] = useInView(0.6)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
