import { motion } from 'framer-motion'
export default function Loader() {
  return (
    <motion.div exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: .6 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <motion.div initial={{ scale: .6, opacity: 0, letterSpacing: '.6em' }} animate={{ scale: 1, opacity: 1, letterSpacing: '.15em' }}
        transition={{ duration: .9 }} className="font-display text-8xl"><span className="text-honda">H</span>ONDA</motion.div>
      <div className="mt-8 h-1 w-64 overflow-hidden rounded bg-white/10">
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.7, ease: [.7, 0, .3, 1] }}
          className="h-full bg-honda shadow-[0_0_20px_#1E6BFF]" />
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.5, 1] }} transition={{ duration: 1.5 }} className="mt-4 text-xs tracking-[.4em] text-white/50">STARTING ENGINE</motion.p>
    </motion.div>
  )
}
