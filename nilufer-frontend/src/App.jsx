import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collections from './pages/Collections'
import PerfumeDetails from './pages/PerfumeDetails'
import Category from './pages/Category'
import About from './pages/About'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/perfume/:id" element={<PerfumeDetails />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Collections />} />
      </Route>
    </Routes>
  )
}
