import { useEffect } from 'react';
import useTimeout from './useTimeout';

function useDebounce(callback: () => {}, delay: number, dependencies: any[]): void {
  const { reset, clear } = useTimeout(callback, delay);

  // reset the timer if dependencies change
  useEffect(reset, [...dependencies, reset]);

  // on the first run, clear the timeout
  useEffect(clear, []);
}

export default useDebounce;
