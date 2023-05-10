/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  theme: {
    fontFamily: {
      luckiestguy: ['Luckiest Guy', 'cursive'],
      londrinashadow: ['Londrina Shadow', 'cursive'],
      itim: ['Itim', 'cursive'],
      russo: ['Russo One', 'cursive'],
    },

    colors: {
      thegreen: '#00F0B5',
      thegreener: '#558B6E',
      thered: '#EB251E',
      theorange: '#FAA300',
      thepurple: '#966B9D',
    },
  },
  plugins: [],
};
