import { useState } from 'react'
import { Link } from 'react-router-dom'
import BottleArt from './BottleArt'
import ProductImage from './ProductImage'
import TiltCard from './TiltCard'
import { useFavorites } from '../context/FavoritesContext'
import { formatPrice } from '../data/perfumes'

export function Stars({ value }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs" aria-label={`Rated ${value} out of 5`}>
      <svg width="13" height="13" viewBox="0 0 24 24" className="text-gold-deep transition-transform duration-500 group-hover:rotate-[72deg] group-hover:scale-125" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6L12 2Z" />
      </svg>
      {value.toFixed(1)}
    </span>
  )
}

export const heartPath = 'M12 20.5s-7.5-4.6-9-9.6C2 7.7 4 5 7 5c2 0 3.7 1.1 5 3 1.3-1.9 3-3 5-3 3 0 5 2.7 4 5.9-1.5 5-9 9.6-9 9.6Z'

export default function PerfumeCard({ perfume: p }) {
  const { isFav, toggle } = useFavorites()
  const liked = isFav(p.id)
  const [burst, setBurst] = useState(0)

  const handleLike = () => {
    toggle(p)
    if (!liked) setBurst((b) => b + 1)
  }

  return (
    <article className="group relative h-full">
      <TiltCard className="h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/40 bg-sand-light/70 transition-shadow duration-500 group-hover:border-gold-deep/60 group-hover:shadow-[0_30px_50px_-24px_rgba(90,36,16,0.55)]">
          {/* image area */}
          <div className="relative grid h-72 place-items-center overflow-hidden">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-125"
              style={{ background: `radial-gradient(circle at 50% 62%, ${p.liquid[0]}40, transparent 62%)` }}
            />
            <span className="absolute left-1/2 top-[58%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 transition-all duration-700 group-hover:h-56 group-hover:w-56 group-hover:border-gold-deep/50" />
            <span className="absolute left-1/2 top-[58%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-gold/20 blur-2xl" />

            <div className="relative flex h-44 w-full justify-center transition-transform duration-700 ease-out group-hover:-translate-y-4 group-hover:-rotate-6 group-hover:scale-110">
              <ProductImage
                id={p.id}
                alt={p.name}
                fallback={
                  <div className="aspect-[220/380] h-full">
                    <BottleArt shape={p.shape} liquid={p.liquid} glass={p.glass} cap={p.cap} name={p.name.split(' ')[0]} />
                  </div>
                }
              />
            </div>

            {p.tag && (
              <span className="absolute left-4 top-4 overflow-hidden rounded-full bg-amber-deep px-3 py-1 text-xs text-sand-light">
                <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/25" />
                <span className="relative">{p.tag}</span>
              </span>
            )}

            {/* notes slide up on hover */}
            <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-1.5 px-2 pb-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
              {Object.values(p.notes).map((n) => (
                <span key={n} className="whitespace-nowrap rounded-full border border-gold-deep/40 bg-sand-light/90 px-2 py-1 text-[10.5px] text-ink backdrop-blur">
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* details */}
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-luxe text-2xl font-medium leading-tight text-amber-deep">
                <Link to={`/perfume/${p.id}`} className="after:absolute after:inset-0 after:content-['']">
                  <span className="bg-gradient-to-r from-gold-deep to-gold-deep bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {p.name}
                  </span>
                </Link>
              </h3>
              <Stars value={p.rating} />
            </div>
            <p className="mt-1 text-sm font-light capitalize">{p.categories.join(' / ')}</p>
            <p className="mt-3 text-sm font-light leading-relaxed">{p.blurb}</p>

            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              <div>
                <div className="font-luxe text-2xl font-medium">{formatPrice(p.price)}</div>
                <div className="text-xs font-light">100 ml</div>
              </div>

              {/* like / favorite */}
              <div className="relative z-20">
                {burst > 0 && liked && <span key={burst} className="pointer-events-none absolute inset-0 animate-burst border border-gold-deep" />}
                <button
                  type="button"
                  onClick={handleLike}
                  aria-pressed={liked}
                  aria-label={liked ? `Remove ${p.name} from favorites` : `Add ${p.name} to favorites`}
                  className={
                    'group/btn relative overflow-hidden whitespace-nowrap border px-4 py-2 text-sm transition-colors duration-500 ' +
                    (liked ? 'border-amber-deep text-sand-light' : 'border-ink hover:text-sand-light')
                  }
                >
                  <span
                    className={
                      'absolute inset-0 transition-transform duration-500 ease-out ' +
                      (liked ? 'translate-x-0 bg-amber-deep' : '-translate-x-full bg-ink group-hover/btn:translate-x-0')
                    }
                  />
                  <span className="relative inline-flex items-center gap-2">
                    <svg
                      key={liked}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill={liked ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                      className={liked ? 'animate-bump text-gold' : ''}
                      aria-hidden="true"
                    >
                      <path d={heartPath} />
                    </svg>
                    {liked ? 'Liked' : 'Like'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </article>
  )
}
