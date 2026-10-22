import { motion } from 'framer-motion'
const v = {
  up: { opacity: 0, y: 60 }, left: { opacity: 0, x: -80 },
  right: { opacity: 0, x: 80 }, zoom: { opacity: 0, scale: .8 },
}
export default function Reveal({ children, dir = 'up', delay = 0, className = '' }) {
  return (
    <motion.div className={className} initial={v[dir]} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: .8, delay, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  )
}
