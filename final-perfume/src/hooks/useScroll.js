import { useEffect, useState } from 'react'

// Current scroll position and progress (0 to 1), updated once per frame.
export function useScroll() {
  const [s, setS] = useState({ y: 0, progress: 0 })

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setS({ y: window.scrollY, progress: max > 0 ? Math.min(1, window.scrollY / max) : 0 })
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [])

  return s
}
