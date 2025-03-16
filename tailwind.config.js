import path from 'path';
const prelinePath = path.dirname(require.resolve('preline'));

module.exports = {
  //content: ['./app/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/preline.js', 'node_modules/preline/dist/*.js'],
  content: ['./app/**/*.{js,jsx,ts,tsx}', `${prelinePath}/**/*.{js,ts,jsx,tsx}`],
  plugins: [require('preline/plugin')],
  darkMode: 'class',
};
