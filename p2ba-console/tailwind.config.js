/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': '#3A8DFF',
        'warm-yellow': '#FFC700',
        'light-gray': '#F0F0F0',
        'dark-gray': '#1a1a1a',
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        'xl': '12px',
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px #3A8DFF',
      },
    },
  },
  plugins: [],
}

