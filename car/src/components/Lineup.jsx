import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CarCard from './CarCard'
import { cars } from '../data'

// Vertical scroll -> cards left to right sarkatat.
export default function Lineup() {
  const ref = useRef(null)
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768
  const w = mobile ? 80 : 40, gap = 2
  const shift = Math.max(0, cars.length * (w + gap) - 100 + 8)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${shift}vw`])
  const head = <h2 className="mb-10 px-6 font-display text-6xl md:text-8xl md:px-16">The <span className="text-honda">lineup</span></h2>
  const cards = cars.map(c => <div key={c.id} style={{ width: `${w}vw` }} className="shrink-0"><CarCard car={c} /></div>)
  if (!shift) return (
    <section className="py-24">{head}<div className="flex gap-8 px-6 md:px-16">{cards}</div></section>
  )
  return (
    <section ref={ref} style={{ height: `${150 + shift * 3}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        {head}
        <motion.div style={{ x }} className="flex w-max gap-[2vw] px-6 md:px-16">{cards}</motion.div>
      </div>
    </section>
  )
}
