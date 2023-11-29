import { useCallback, useRef, useState } from 'react';

/**
 * historically store states for undo & redo
 * @param initialValue
 * @param param1
 * @returns
 */
function useStateWithHistory(initialValue: any, { maxSize = 10 } = {}) {
  const [value, setValue] = useState(initialValue);
  const historyRef = useRef([initialValue]);
  const pointerRef = useRef(0);

  const set = useCallback(
    (v: any) => {
      const resolvedValue = typeof v === 'function' ? v(value) : v;
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > maxSize) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setValue(resolvedValue);
    },
    [maxSize, value],
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback(() => {
    if (pointerRef.current < 0 || pointerRef.current >= historyRef.current.length) return;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  return [value, set, { back, forward, history: historyRef.current, pointer: pointerRef.current, go }];
}

export default useStateWithHistory;
