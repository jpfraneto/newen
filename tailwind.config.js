/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
  theme: {
    colors: {
      thegreen: '#00F0B5',
      thegreener: '#558B6E',
      thered: '#EB251E',
      theorange: '#FAA300',
      thepurple: '#966B9D',
    },
    textColor: {
      primary: '#FFF',
      white: '#FFF',
      black: '#000',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
