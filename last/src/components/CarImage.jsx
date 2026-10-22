export default function CarImage({ car, className = '', hideIfMissing = false }) {
  if (!car.image) {
    if (hideIfMissing) return null
    return (
      <div className={`flex items-center justify-center rounded-xl border border-dashed border-white/20 p-4 text-center text-xs text-white/40 ${className}`}>
        src/assets/cars/ madhe image taka
      </div>
    )
  }
  return (
    <div className={className}>
      <img src={car.image} alt={car.name}
        className="h-full w-full object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-110" />
    </div>
  )
}
