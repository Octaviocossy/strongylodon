import { useEffect, useRef } from 'react';

const useFirstLoad = <T>(fn: (() => T) | null) => {
  const firstLoad = useRef(true);
  const result = useRef<T | null>(null);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;

      return;
    }

    result.current = fn && fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { result };
};

export default useFirstLoad;
