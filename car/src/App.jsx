import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import CursorGlow from './components/CursorGlow'
import Home from './pages/Home'
import Models from './pages/Models'
import About from './pages/About'

export default function App() {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 2300); return () => clearTimeout(t) }, [])
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <CursorGlow />
      <Navbar />
      {!loading && (
        <motion.div key={pathname} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<Models />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">Fan-made showcase project. Honda is a trademark of Honda Motor Co.</footer>
        </motion.div>
      )}
    </>
  )
}
