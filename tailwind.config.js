const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.rose,
        accent: colors.teal,
        main: colors.coolGray,
        background: colors.blueGray,
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        violet: colors.violet,
        sky: colors.sky,
        cyan: colors.cyan,
        teal: colors.teal,
        emerald: colors.emerald,
        lime: colors.lime,
        amber: colors.amber,
        orange: colors.orange,
        grey: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121'
        },
        white: colors.white,
        black: colors.black,
        red: colors.red,
        yellow: colors.yellow,
      },
      fontFamily: {
        sans: ['IBM Plex Sans', ...fontFamily.sans]
      },
    },

    variants: {
      extend: {
        backgroundColor: ["active"],
        typography: ['dark', 'responsive']
      },
    },
    plugins: [require('@tailwindcss/typography')],
  }
}