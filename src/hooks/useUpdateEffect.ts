import { useEffect, useRef } from 'react';

/**
 * @description Run effect only on update (not executed on the first rendering)
 * @param callback
 * @param dependencies
 */
export default function useUpdateEffect(callback: () => void, dependencies: any[]): void {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    // skip the first render
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    return callback();
  }, dependencies);
}
