import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import BottleArt from '../BottleArt'
import ProductImage from '../ProductImage'
import { perfumes } from '../../data/perfumes'

const tiles = [
  { slug: 'men', label: 'For him', perfume: 'midnight-oud' },
  { slug: 'women', label: 'For her', perfume: 'white-lotus' },
  { slug: 'unisex', label: 'For everyone', perfume: 'nilufer-original' },
  { slug: 'oud', label: 'The oud house', perfume: 'velvet-oud' },
  { slug: 'luxury', label: 'Luxury', perfume: 'royal-saffron' },
]

export default function ShopByCategory() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-28 md:px-10">
      <Reveal className="mb-12 text-center">
        <p className="mb-2 text-sm font-light text-gold-deep">Find your mood</p>
        <h2 className="font-luxe text-4xl font-medium text-amber-deep sm:text-6xl">Shop by category</h2>
      </Reveal>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
        {tiles.map((t, i) => {
          const p = perfumes.find((x) => x.id === t.perfume)
          const count = perfumes.filter((x) => x.categories.includes(t.slug)).length
          return (
            <Reveal as="li" key={t.slug} from="up" delay={i * 110} className={i === 4 ? 'col-span-2 md:col-span-1' : ''}>
              <Link
                to={`/category/${t.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-gold/40 transition-shadow duration-500 hover:shadow-[0_30px_46px_-24px_rgba(90,36,16,0.6)] max-md:aspect-[4/5] max-md:[&:is(.col-span-2_*)]:aspect-[16/9]"
                style={{ background: `linear-gradient(165deg, ${p.liquid[0]}2e, ${p.liquid[1]}66)` }}
              >
                <span className="absolute left-1/2 top-[40%] h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40 transition-all duration-700 group-hover:scale-125 group-hover:border-gold-deep/60" />
                <span className="absolute left-1/2 top-[40%] h-[45%] w-[55%] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-gold/30 blur-2xl" />

                <div className="absolute inset-x-0 top-[5%] flex h-[64%] justify-center transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:-rotate-6 group-hover:scale-110">
                  <ProductImage
                    id={p.id}
                    alt=""
                    fallback={
                      <div className="aspect-[220/380] h-full">
                        <BottleArt shape={p.shape} liquid={p.liquid} glass={p.glass} cap={p.cap} name={p.name.split(' ')[0]} />
                      </div>
                    }
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-sand-light via-sand-light/85 to-transparent p-4 pt-12">
                  <div>
                    <h3 className="font-luxe text-2xl font-medium leading-tight text-amber-deep">{t.label}</h3>
                    <p className="text-xs font-light">{count} perfumes</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-deep/50 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-amber-deep group-hover:bg-amber-deep group-hover:text-sand-light">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
