import { useRef } from 'react';

function usePrevious(value: any) {
  const curRef = useRef(value);
  const prevRef = useRef();

  if (curRef.current !== value) {
    prevRef.current = curRef.current;
    curRef.current = value;
  }

  return prevRef.current;
}

export default usePrevious;
