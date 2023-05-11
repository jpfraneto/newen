/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // ...
  ],
  theme: {
    colors: {
      thegreen: '#00F0B5',
      thegreener: '#558B6E',
      thered: '#EB251E',
      thedarkgreen: '#036F01',
      thedarkred: '#D20000',
      theorange: '#FAA300',
      thepurple: '#966B9D',
      theblack: '#000',
      thewhite: '#FFF',
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
