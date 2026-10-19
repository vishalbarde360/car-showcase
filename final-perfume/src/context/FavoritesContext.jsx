import { createContext, useContext, useEffect, useRef, useState } from 'react'

const KEY = 'nilufer:favorites'
const FavoritesContext = createContext({ ids: [], count: 0, isFav: () => false, toggle: () => {}, clear: () => {} })

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(load)
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* storage can be blocked, favorites then last for this visit only */
    }
  }, [ids])

  const show = (msg, liked) => {
    setToast({ id: Date.now(), msg, liked })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 2200)
  }

  const toggle = (perfume) => {
    const has = ids.includes(perfume.id)
    setIds((list) => (has ? list.filter((x) => x !== perfume.id) : [...list, perfume.id]))
    show(has ? `${perfume.name} removed from favorites` : `${perfume.name} added to favorites`, !has)
  }

  const clear = () => {
    setIds([])
    show('Favorites cleared', false)
  }

  return (
    <FavoritesContext.Provider value={{ ids, count: ids.length, isFav: (id) => ids.includes(id), toggle, clear }}>
      {children}
      {toast && (
        <div
          key={toast.id}
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 animate-toast items-center gap-3 rounded-full bg-amber-deep px-6 py-3 text-sm text-sand-light shadow-[0_20px_40px_-12px_rgba(60,20,8,0.6)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" className="animate-bump text-gold" fill={toast.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20.5s-7.5-4.6-9-9.6C2 7.7 4 5 7 5c2 0 3.7 1.1 5 3 1.3-1.9 3-3 5-3 3 0 5 2.7 4 5.9-1.5 5-9 9.6-9 9.6Z" />
          </svg>
          {toast.msg}
        </div>
      )}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
