import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, initialState: any) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);

    let result;
    try {
      if (storedValue) {
        result = JSON.parse(storedValue);
      } else {
        result = initialState;
      }
    } catch (e) {
      result = storedValue;
    }

    return result;
  });

  useEffect(
    function () {
      typeof value !== 'string' ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, value);
    },
    [value, key],
  );

  return [value, setValue];
}
