/* eslint-disable */
import { useEffect, useState } from 'react';

interface ScreenSize {
  width: number;
  height: number;
}

const useSreenSize = (): ScreenSize => {
   const getScreenSize = (): ScreenSize => ({
    width: window?.innerWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState<ScreenSize>({ width: 0, height: 0});

  useEffect(() => {
    const onScreenResize = () => setWindowSize(getScreenSize());

    // Fonctionne en SSR car le composant est monté à ce moment
    window.addEventListener('resize', onScreenResize);

    onScreenResize();

    return () => window.removeEventListener('resize', onScreenResize);
  }, []);

  return windowSize;
};

export default useSreenSize