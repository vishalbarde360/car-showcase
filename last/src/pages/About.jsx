import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../components/Reveal'
import CarImage from '../components/CarImage'
import { byId } from '../data'

const steps = [
  ['1948', 'Honda Motor Co. is founded by Soichiro Honda.'],
  ['1972', 'The Civic arrives and changes small cars.'],
  ['1976', 'The Accord sets a new standard for sedans.'],
  ['Today', 'Hybrid and electric technology leads the way.'],
]
export default function About() {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 0.9, 1], ['2%', '105%', '105%'])
  return (
    <section className="mx-auto max-w-6xl px-6 pb-48 pt-32 md:pt-36">
      <Reveal dir="left"><h1 className="font-display text-6xl md:text-9xl">Our <span className="text-honda">story</span></h1></Reveal>
      <Reveal delay={.1}><p className="mt-6 max-w-xl text-white/70">A short Honda timeline. Keep scrolling — the car drives along with you.</p></Reveal>
      <div className="relative mt-12 border-l-2 border-honda/40 pl-8 md:mt-16 md:pl-14">
        {steps.map(([y, t], i) => (
          <div key={y} className="relative mb-10 md:mb-12">
            <span className="absolute -left-[41px] top-8 h-4 w-4 animate-pulseRed rounded-full bg-honda shadow-[0_0_20px_#1E6BFF] md:-left-[75px]" />
            <Reveal dir={i % 2 ? 'right' : 'left'} className={`max-w-2xl rounded-2xl border border-white/10 bg-coal p-6 transition hover:border-honda md:p-8 ${i % 2 ? 'md:ml-auto' : ''}`}>
              <div className="font-display text-5xl text-honda md:text-6xl">{y}</div>
              <p className="text-base text-white/80 md:text-lg">{t}</p>
            </Reveal>
          </div>))}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 h-12 bg-black" />
      <motion.div style={{ left: x }} className="fixed bottom-9 z-50 w-32 md:w-56">
        <CarImage car={byId('accord')} hideIfMissing className="w-full" />
      </motion.div>
    </section>
  )
}
