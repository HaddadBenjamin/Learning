import { MutableRefObject, useEffect } from 'react';
import useWindowEvent from '../events/useWindowEvent';
import useThrottledFunction from '../performance/useThrottledFunction';

// By default, vh and vw units are not correctly supported in mobile.
// To fix it we have to use this hook and this CSS usage calc(var(--vh, 1vh) * 100);
const useViewportsCssVariables = <T extends HTMLElement>(
  reference: MutableRefObject<T>,
): void => {
  const updateViewportsCssVariables = useThrottledFunction((): void => {
    if (reference?.current?.style) {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;

      reference.current.style.setProperty('--vh', `${vh}px`);
      reference.current.style.setProperty('--vw', `${vw}px`);
    }
  }, 300);

  useEffect(() => { updateViewportsCssVariables(); }, []);
  useWindowEvent('resize', updateViewportsCssVariables);
};

export default useViewportsCssVariables;
