/** @type {import('tailwindcss').Config} */

import { addDynamicIconSelectors } from '@iconify/tailwind';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eff6ff',
          100: '#dae9ff',
          200: '#bdd9ff',
          300: '#90c2ff',
          400: '#5ca1fe',
          500: '#367cfb',
          600: '#205cf0',
          700: '#1743d1',
          800: '#1a3ab3',
          900: '#1b368d',
          950: '#152256',
        },
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
