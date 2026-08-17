import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#CA1F28', hover: '#A31820' },
        sidebar: '#1a1a2e',
      },
    },
  },
  plugins: [],
}
export default config
