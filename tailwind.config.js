// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'main': '#1B3672',
      'l-blue': '#E9FDFC',
      'l-pink': '#FDE9E9',
      'l-yellow': '#FDFDE9',
      'orange': '#F39459',
      'gray': '#DDDDDD',
  },
},
  darkMode: "class",
  plugins: [nextui()]
}

