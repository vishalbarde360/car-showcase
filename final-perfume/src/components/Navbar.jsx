import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export const categories = [
  { slug: 'men', label: 'Men' },
  { slug: 'women', label: 'Women' },
  { slug: 'unisex', label: 'Unisex' },
  { slug: 'oud', label: 'Oud' },
  { slug: 'luxury', label: 'Luxury' },
]

export default function Navbar() {
  const { count } = useFavorites()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div
      className={
        'sticky top-0 z-40 transition-all duration-500 ' +
        (scrolled ? 'bg-sand/85 shadow-[0_12px_30px_-20px_rgba(70,45,15,0.6)] backdrop-blur-md' : 'bg-transparent')
      }
    >
    <header className={'nav' + (scrolled ? ' is-scrolled' : '')}>
      <Link to="/" className="nav__logo" aria-label="Nilufer home">
        <span className="nav__logo-name">Nilufer</span>
        <span className="nav__logo-sub">Eau de Parfum</span>
      </Link>

      <nav aria-label="Main">
        <ul className="nav__links">
          <li>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/collections">Collections</NavLink>
          </li>
          <li className="nav__drop">
            <NavLink to="/category/men" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Categories
            </NavLink>
            <ul className="nav__menu">
              {categories.map((c) => (
                <li key={c.slug}>
                  <NavLink to={`/category/${c.slug}`}>{c.label}</NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>

      <Link to="/favorites" className="nav__cart group" aria-label={`Favorites, ${count} saved`}>
        <span className="transition-colors duration-300 group-hover:text-gold-deep">Favorites</span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={count > 0 ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
          className={'transition-transform duration-300 group-hover:scale-125 ' + (count > 0 ? 'text-gold-deep' : '')}
          aria-hidden="true"
        >
          <path d="M12 20.5s-7.5-4.6-9-9.6C2 7.7 4 5 7 5c2 0 3.7 1.1 5 3 1.3-1.9 3-3 5-3 3 0 5 2.7 4 5.9-1.5 5-9 9.6-9 9.6Z" />
        </svg>
        {count > 0 && (
          <span key={count} className="grid h-4 min-w-4 animate-bump place-items-center rounded-full bg-gold-deep px-1 text-[11px] leading-none text-sand-light">
            {count}
          </span>
        )}
      </Link>
    </header>
    </div>
  )
}
