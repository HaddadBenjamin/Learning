import { useEffect, useState } from 'react';

interface ScreenSize {
  width: number;
  height: number;
}

// Optimisation possible : passer en paramètre un throttleValue, valeur par défault = 300, mais créera une dépendance à Lodash.
export default () : ScreenSize => {
  // "window" is not available during server side rendering.
  if (typeof window === 'undefined') return { width: 0, height: 0 };

  const getScreenSize = (): ScreenSize => ({
    width: window?.innerWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState<ScreenSize>(getScreenSize());

  useEffect(() => {
    const onScreenResize = () => setWindowSize(getScreenSize());

    window.addEventListener('resize', onScreenResize);

    onScreenResize();

    return () => window.removeEventListener('resize', onScreenResize);
  }, []);

  return windowSize;
};
