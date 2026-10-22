import { Link } from 'react-router-dom'

import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import Wind from '../components/Wind'
import { useEffect, useRef } from 'react'
import CarImage from '../components/CarImage'
import Reveal from '../components/Reveal'
import Showcase from '../components/Showcase'
import Lineup from '../components/Lineup'
import { cars, pick, byId } from '../data'
const Split = ({ text, delay = 0 }) => text.split('').map((c, i) => (
  <motion.span key={i} initial={{ opacity: 0, y: 70, rotate: 8 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ delay: delay + i * .05, duration: .5 }} className="inline-block">{c === ' ' ? '\u00A0' : c}</motion.span>
))

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v) + suffix } })
    return () => c.stop()
  }, [inView])
  return <span ref={ref}>0{suffix}</span>
}

function Counter({ n, label }) {
  return (
    <Reveal dir="zoom" className="text-center">
      <div className="font-display text-6xl text-honda">{n}</div>
      <div className="text-sm text-white/60">{label}</div>
    </Reveal>
  )
}

export default function Home() {
  const hero = useRef(null)
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const carX = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.7])
  const blur = useTransform(scrollYProgress, [0, .9], ['blur(0px)', 'blur(10px)'])
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const fade = useTransform(scrollYProgress, [0, .7], [1, 0])
  const words = 'HONDA • THE POWER OF DREAMS • '.repeat(6)

  return (
    <>
      {/* HERO */}
      <section ref={hero} className="relative flex min-h-screen items-center overflow-hidden pt-20">
  <motion.div style={{ x: bgX }} className="pointer-events-none absolute -left-20 top-1/4 select-none whitespace-nowrap font-display text-[26vw] leading-none outline-text opacity-30">HONDA</motion.div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,#1E6BFF33,transparent_60%)]" />
  <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
    <motion.div style={{ opacity: fade }} className="self-center">
      <h1 className="font-display text-7xl leading-[.9] md:text-9xl">
        <Split text="DRIVE" /><br /><Split text="THE " delay={.3} /><span className="text-honda"><Split text="DREAM" delay={.5} /></span>
      </h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-6 max-w-md text-white/70">
        Sedans, SUVs and hatchbacks — the full Honda range, in motion.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-8">
        <Link to="/models" className="inline-block rounded-full bg-honda px-8 py-3 font-semibold transition hover:scale-110 hover:shadow-[0_0_40px_#1E6BFF]">Explore models</Link>
      </motion.div>
    </motion.div>

    <motion.div style={{ x: carX, scale, filter: blur }} className="relative self-center">
      <Wind />
      <motion.div initial={{ x: 700, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.4, ease: 'easeOut', delay: .3 }}>
        <div className="animate-float relative z-10"><CarImage car={byId('accord')} className="h-[320px] w-full md:h-[520px] [&_img]:object-bottom" /></div>
      </motion.div>
      <div className="relative z-10 mt-0 h-1 overflow-hidden"><div className="flex w-[200%] animate-road">
        {Array.from({ length: 30 }).map((_, i) => <span key={i} className="mr-[120px] h-1 w-20 shrink-0 bg-white/40" />)}
      </div></div>
    </motion.div>
  </div>
  <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute bottom-8 left-1/2 text-sm text-white/50">scroll ↓</motion.div>
</section>

      {/* MARQUEES (opposite directions) */}
      <div className="overflow-hidden border-y border-honda/30 bg-honda py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-3xl tracking-widest"><span>{words}</span><span>{words}</span></div>
      </div>
      <div className="overflow-hidden py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-3xl tracking-widest outline-text" style={{ animationDirection: 'reverse' }}><span>{words}</span><span>{words}</span></div>
      </div>

      {/* STATS */}
      <section className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 py-28 md:grid-cols-4">
        <Counter n={<CountUp to={75} suffix="+" />} label="Years of engineering" />
        <Counter n={<CountUp to={cars.length} />} label="Models here" />
        <Counter n={<CountUp to={3} />} label="Body styles" />
        <Counter n={<CountUp to={100} suffix="%" />} label="Honda spirit" />
      </section>

      <Showcase />
      <Lineup />

      {/* CTA */}
      <section className="relative overflow-hidden py-32 text-center">
        <Reveal dir="zoom" className="relative z-10">
          <h2 className="font-display text-6xl md:text-9xl">Ready to <span className="outline-text">roll?</span></h2>
          <Link to="/models" className="mt-8 inline-block rounded-full border-2 border-honda px-10 py-3 transition hover:bg-honda hover:shadow-[0_0_40px_#1E6BFF]">See all models</Link>
        </Reveal>
        <motion.div initial={{ x: '-120%' }} whileInView={{ x: '120%' }} viewport={{ once: true }} transition={{ duration: 3.5, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-6 left-0 z-0 w-72 md:w-96">
          <CarImage car={pick(3)} hideIfMissing className="h-32 w-full" />
        </motion.div>
      </section>
    </>
  )
}
