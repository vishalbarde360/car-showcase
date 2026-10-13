import { useInView } from '../hooks/useInView'

const hidden = {
  up: 'translate-y-10',
  left: '-translate-x-14',
  right: 'translate-x-14',
  zoom: 'scale-90',
  none: '',
}

// Fades an element in when it scrolls into view. `from` picks the direction.
export default function Reveal({ as: Tag = 'div', from = 'up', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView(0.15)

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={
        'transition-all duration-1000 ease-out ' +
        (inView ? 'translate-x-0 translate-y-0 scale-100 opacity-100 ' : `opacity-0 ${hidden[from]} `) +
        className
      }
      {...rest}
    >
      {children}
    </Tag>
  )
}
