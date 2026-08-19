import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CellphoneS clone design system
        cps: {
          red: '#e30019',
          'red-hover': '#b8001c',
          'red-light': '#f26522',
          bg: '#f2f2f3',
          text: '#363636',
          border: '#e5e7eb',
        },
        primary: {
          DEFAULT: '#e30019',
          hover: '#b8001c',
          50: '#FEF2F2',
          100: '#FEE2E2',
        },
        secondary: '#1A1A1A',
        accent: '#FFD600',
        surface: '#FFFFFF',
        background: '#F5F5F5',
        border: '#E0E0E0',
        success: '#00C853',
        warning: '#FF9800',
        error: '#F44336',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12)',
        'dropdown': '0 4px 12px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'shine-card': {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(300%) skewX(-12deg)' },
        },
        skeleton: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        shine: 'shine 2s linear infinite',
        'shine-card': 'shine-card 1s ease-out',
        skeleton: 'skeleton 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config