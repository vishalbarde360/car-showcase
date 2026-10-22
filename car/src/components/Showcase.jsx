import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import CarImage from './CarImage'
import { cars } from '../data'

// Sticky section: scroll karat jaa, gaadi + naav + specs badaltat.
export default function Showcase() {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', v => setI(Math.min(cars.length - 1, Math.floor(v * cars.length))))
  const c = cars[i]
  return (
    <section ref={ref} style={{ height: `${Math.max(1, cars.length) * 90}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-16">
        <AnimatePresence mode="wait">
          <motion.div key={c.id + 'bg'} initial={{ opacity: 0, x: 200 }} animate={{ opacity: .25, x: 0 }} exit={{ opacity: 0, x: -200 }}
            className="pointer-events-none absolute left-0 top-1/4 whitespace-nowrap font-display text-[20vw] leading-none outline-text">
            {c.name.replace('Honda ', '').toUpperCase()}
          </motion.div>
        </AnimatePresence>
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-6 md:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div key={c.id + 't'} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: .4 }}>
              <span className="rounded-full border border-honda/60 px-3 py-1 text-xs text-honda">{c.tag}</span>
              <h3 className="mt-4 font-display text-6xl md:text-8xl">{c.name}</h3>
              <p className="mt-2 max-w-md text-white/60">{c.desc}</p>
              <div className="mt-6 flex gap-6 font-display text-3xl">
                {[['Power', c.power], ['Mileage', c.mileage], ['Seats', c.seats]].map(([k, v]) => (
                  <div key={k}><div className="text-sm text-honda">{k}</div>{v}</div>))}
              </div>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={c.id + 'i'} initial={{ opacity: 0, x: 300, scale: .8 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -300 }} transition={{ duration: .6, ease: 'easeOut' }}>
              <CarImage car={c} className="h-[300px] w-full md:h-[560px]" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {cars.map((x, k) => <span key={x.id} className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-10 bg-honda' : 'w-4 bg-white/20'}`} />)}
        </div>
      </div>
    </section>
  )
}
