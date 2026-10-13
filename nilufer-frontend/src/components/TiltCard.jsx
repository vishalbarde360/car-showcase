import { useRef } from 'react'

// Card that leans towards the mouse pointer.
export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`
  }
  const leave = () => {
    ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={'transition-transform duration-200 ease-out will-change-transform ' + className}
    >
      {children}
    </div>
  )
}
