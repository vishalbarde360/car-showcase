export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
colors: { ink: '#050505', coal: '#121212', honda: '#1E6BFF', ember: '#6FA8FF' },    fontFamily: { display: ['Bebas Neue', 'Impact', 'sans-serif'], body: ['Outfit', 'system-ui', 'sans-serif'] },
    keyframes: {
      road: { to: { transform: 'translateX(-200px)' } },
      marquee: { to: { transform: 'translateX(-50%)' } },
      spin: { to: { transform: 'rotate(360deg)' } },
      float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      pulseRed: { '0%,100%': { opacity: .4 }, '50%': { opacity: 1 } },
    },
    animation: { road: 'road .5s linear infinite', marquee: 'marquee 25s linear infinite',
      spin: 'spin .6s linear infinite', float: 'float 3s ease-in-out infinite', pulseRed: 'pulseRed 2s ease-in-out infinite' },
  } },
  plugins: [],
}
