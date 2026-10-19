import { productImages, hasAlpha } from '../lib/productImages'

// Shows the real photo for `id` if one exists in src/assets/perfumes,
// otherwise shows the `fallback` (the SVG bottle).
export default function ProductImage({ id, alt, fallback, className = '' }) {
  const src = productImages[id]
  if (!src) return fallback

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable="false"
      className={
        'block h-full w-full select-none object-contain ' +
        (hasAlpha(src) ? 'drop-shadow-[0_16px_16px_rgba(58,26,8,0.35)] ' : 'mix-blend-multiply ') +
        className
      }
    />
  )
}
