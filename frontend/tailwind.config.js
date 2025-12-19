/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ef4444', // red-500
          dark: '#b91c1c',    // red-700
        },
        darkbg: '#050816',
      },
    },
  },
  plugins: [],
};
