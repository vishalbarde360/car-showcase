import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
export default function Navbar() {
  const cls = ({ isActive }) => `px-2 py-1 transition hover:text-honda md:px-3 ${isActive ? 'text-honda' : 'text-white/80'}`
  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: .7 }} className="fixed inset-x-0 top-0 z-50 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="font-display text-2xl tracking-widest md:text-3xl"><span className="text-honda">H</span>ONDA</Link>
        <nav className="flex gap-1 text-sm tracking-wide md:gap-4">
          <NavLink to="/" end className={cls}>Home</NavLink>
          <NavLink to="/models" className={cls}>Models</NavLink>
          <NavLink to="/about" className={cls}>About</NavLink>
        </nav>
      </div>
    </motion.header>
  )
}
