import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CarCard from '../components/CarCard'
import Reveal from '../components/Reveal'
import { cars } from '../data'

export default function Models() {
  const [f, setF] = useState('All')
  const list = f === 'All' ? cars : cars.filter(c => c.tag === f)
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-36">
      <Reveal dir="left"><h1 className="font-display text-7xl md:text-9xl">All <span className="text-honda">models</span></h1></Reveal>
      <Reveal delay={.15} className="my-10 flex flex-wrap gap-3">
        {['All', ...new Set(cars.map(c => c.tag))].map(t => (
          <button key={t} onClick={() => setF(t)} className="relative rounded-full border border-white/20 px-6 py-2 transition hover:border-honda">
            {f === t && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-honda" />}
            <span className="relative">{t}</span>
          </button>))}
      </Reveal>
      <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map(c => (
            <motion.div key={c.id} layout initial={{ opacity: 0, scale: .8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }} exit={{ opacity: 0, scale: .8 }}><CarCard car={c} /></motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
