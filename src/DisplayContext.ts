import { createContext } from 'react';

export const DisplayContext = createContext({
  font: 'Inter',
  textScale: '100',
  darkMode: false,
  setDarkMode: (val: boolean) => {
    return;
  },
  getDarkMode: (): boolean => false,
});
