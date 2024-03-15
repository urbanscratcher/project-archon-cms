import { createContext } from 'react';

export const DisplayContext = createContext({
  font: 'Inter',
  textScale: '100',
  darkMode: false,
  setDarkMode: (val: boolean) => {
    console.log('setDarkMode', val);
  },
  getDarkMode: (): boolean => false,
});
