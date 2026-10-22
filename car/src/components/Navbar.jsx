import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const cls = ({ isActive }) =>
    `px-3 py-1 transition hover:text-honda ${isActive ? 'text-honda' : 'text-white/80'}`

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-x-0 top-0 z-50 bg-ink/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-3xl tracking-widest">
          <span className="text-honda">H</span>ONDA
        </Link>
        <nav className="flex gap-4 text-sm tracking-wide">
          <NavLink to="/" end className={cls}>Home</NavLink>
          <NavLink to="/models" className={cls}>Models</NavLink>
          <NavLink to="/about" className={cls}>About</NavLink>
        </nav>
      </div>
    </motion.header>
  )
}