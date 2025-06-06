/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/constants/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: colors,
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
