/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#060B14',
          soft: '#0B1220',
          surface: '#0D1526',
          raised: '#111C33'
        },
        bio: {
          DEFAULT: '#22E5C8',
          dim: '#12A38F',
          bright: '#6FFFE9'
        },
        pulse: {
          DEFAULT: '#7C6CFF',
          dim: '#5B4CDB'
        },
        vital: {
          rose: '#FF6B8B',
          amber: '#FFB84D'
        },
        ink: {
          DEFAULT: '#E8F0F5',
          muted: '#8FA1B3',
          faint: '#4C5A6E'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'grid-glow': 'radial-gradient(circle at 50% 0%, rgba(34,229,200,0.12), transparent 60%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")"
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(34,229,200,0.45)',
        'glow-violet': '0 0 40px -8px rgba(124,108,255,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.6)'
      },
      keyframes: {
        pulseline: {
          '0%,100%': { opacity: 0.5 },
          '50%': { opacity: 1 }
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        pulseline: 'pulseline 2.4s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
