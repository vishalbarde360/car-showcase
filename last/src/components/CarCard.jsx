import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import CarImage from './CarImage'

export default function CarCard({ car }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-.5, .5], [10, -10]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(x, [-.5, .5], [-10, 10]), { stiffness: 150, damping: 15 })
  return (
    <motion.div
      initial="rest" whileHover="hover" animate="rest" whileTap={{ scale: .98 }}
      variants={{ rest: { y: 0 }, hover: { y: -12 } }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - .5); y.set((e.clientY - r.top) / r.height - .5) }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black p-6 hover:border-honda hover:shadow-[0_20px_60px_-15px_#1E6BFF]">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-honda/20 blur-3xl transition-all duration-500 group-hover:scale-[2]" />
      <span className="relative rounded-full border border-honda/60 px-3 py-1 text-xs text-honda">{car.tag}</span>

      <motion.div variants={{ rest: { x: 0 }, hover: { x: 18 } }} transition={{ duration: .5 }} className="relative my-6">
        {/* speed lines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {[20, 45, 70].map((t, i) => (
            <div key={t} className="streak absolute h-px w-24 bg-gradient-to-r from-transparent to-honda" style={{ top: `${t}%`, left: '60%', animationDelay: `${i * .15}s` }} />
          ))}
        </div>
        {/* headlight + floor glow */}
        <div className="absolute right-4 top-1/2 h-14 w-14 rounded-full bg-white/70 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-2 left-1/2 h-4 w-2/3 -translate-x-1/2 rounded-full bg-honda/30 blur-xl transition-all duration-500 group-hover:w-5/6 group-hover:bg-honda/60" />
        <CarImage car={car} className="relative h-48 w-full" />
      </motion.div>

      <h3 className="relative font-display text-4xl tracking-wide">{car.name}</h3>
      <p className="relative mt-1 text-sm text-white/60">{car.desc}</p>
      <motion.div variants={{ rest: { opacity: 0, y: 20, height: 0 }, hover: { opacity: 1, y: 0, height: 'auto' } }}
        className="specs relative grid grid-cols-3 gap-2 overflow-hidden pt-4 text-center text-xs">
        {[['Power', car.power], ['Mileage', car.mileage], ['Seats', car.seats]].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white/5 p-2"><div className="text-honda">{k}</div><div>{v}</div></div>
        ))}
      </motion.div>
    </motion.div>
  )
}
