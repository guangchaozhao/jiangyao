/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        cosmic: '#050B1A',
        'deep-blue': '#0A1628',
        electric: '#1A6FFF',
        cyber: '#00D4FF',
        star: '#7CC8FF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        esports: ['Orbitron', '"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'scan-line': 'scan 8s linear infinite',
        'particle': 'particle 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(0,212,255,0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(0,212,255,0.7), 0 0 80px rgba(0,212,255,0.3)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(50px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}


