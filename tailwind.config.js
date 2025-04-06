module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/preline.js'],
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
  darkMode: 'class',
};
