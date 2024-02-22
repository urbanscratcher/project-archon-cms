import { PropsWithChildren, useEffect, useState } from 'react';
import { DisplayContext } from './DisplayContext';

function DisplayContextProvider({ children }: PropsWithChildren) {
  const [font, setFont] = useState('Inter');
  const [textScale, setTextScale] = useState('100');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedFont = localStorage.getItem('font');
    savedFont && setFont(savedFont);
  }, []);

  useEffect(() => {
    const savedTextScale = localStorage.getItem('text_scale');
    savedTextScale && setTextScale(savedTextScale);
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('dark_mode') === '1' ? true : false;
    setDarkMode(savedDarkMode);
  }, []);

  // display setting
  const root = document.documentElement;
  const curTextSize = 16;
  root.style.setProperty('font-size', curTextSize * 0.01 * +textScale + 'px');
  root.style.fontFamily = font;
  if (darkMode) {
    root.classList.add('dark');
  } else {
    root.classList.contains('dark') && root.classList.remove('dark');
  }
  console.log('displaying...', darkMode);

  return (
    <DisplayContext.Provider
      value={{
        font: font,
        textScale: textScale,
        darkMode: darkMode,
        getDarkMode: (): boolean => (localStorage.getItem('dark_mode') === '1' ? true : false),
        setDarkMode: (val) => {
          setDarkMode(!val);
          if (!val) {
            root.classList.add('dark');
          } else {
            root.classList.contains('dark') && root.classList.remove('dark');
          }
          localStorage.setItem('dark_mode', val === true ? '0' : '1');
        },
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
}

export default DisplayContextProvider;
