import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
export default function CursorGlow() {
  const x = useMotionValue(-300), y = useMotionValue(-300)
  const sx = useSpring(x, { stiffness: 120, damping: 20 }), sy = useSpring(y, { stiffness: 120, damping: 20 })
  useEffect(() => {
    const m = e => { x.set(e.clientX - 150); y.set(e.clientY - 150) }
    window.addEventListener('mousemove', m); return () => window.removeEventListener('mousemove', m)
  }, [])
  return <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[300px] w-[300px] rounded-full bg-honda/20 blur-3xl md:block" />
}
