/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        warn: '#eab308',
        primary: '#22c55e',
        blackprimary: '#1f2937 ',
      },
    },
  },
  plugins: [],
};
