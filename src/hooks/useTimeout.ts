import { useCallback, useEffect, useRef } from 'react';

/**
 * @description Easy clear & reset timeout
 * @param callback what to do after delay
 * @param delay the amount of time to be delayed
 * @returns reset(start again) and clear(remove) functions
 * @example
 * export default function TimeoutComponent(){
 *  const [count, setCount] = useState(10);
 *  const { clear, reset } = useTimeout(() => setCount(0), 1000);
 *
 * return (
 *  <div>
 *   <h1>{count}</h1>
 *   <button onClick={clear}>Clear timeout</button>
 *   <button onClick={reset}>Reset timeout</button>
 *  </div>
 *  )}
 */
function useTimeout(callback: () => {}, delay: number): { reset: () => void; clear: () => void } {
  // useRef to persist the callback function to stay the same
  const callbackRef = useRef<() => {}>(callback);
  // timeout id reference
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [delay]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  return { reset, clear };
}

export default useTimeout;
