import { useState, useEffect, useRef } from 'react';

export const useSwiperRef = <T extends HTMLElement>(
  isSwiperReady: boolean
): [T | null, React.Ref<T>] => {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current);
    }
  }, [isSwiperReady]);

  return [wrapper, ref];
};
