/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fdf2f2',
          100: '#fce4e4',
          200: '#f9cccc',
          300: '#f4a3a3',
          400: '#ec6b6b',
          500: '#df3d3d',
          600: '#c42020',
          700: '#8b1a1a',
          800: '#761919',
          900: '#641b1b',
          950: '#370a0a',
        },
        gold: {
          50: '#fdfaef',
          100: '#faf3d3',
          200: '#f4e4a5',
          300: '#edcf6d',
          400: '#d4a843',
          500: '#d09a2c',
          600: '#b87a21',
          700: '#995b1e',
          800: '#7d491f',
          900: '#6b3d1e',
          950: '#3e1f0d',
        },
        sunset: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        serif: ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
