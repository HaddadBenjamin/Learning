import { useEffect, useState, MutableRefObject } from 'react';

interface ElementSize {
  width: number;
  height: number;
}

export default (ref : MutableRefObject<HTMLElement>): ElementSize => {
  const [elementSize, setElementSize] = useState<ElementSize>({ width: 0, height: 0 });

  const getElementSize = (): ElementSize => ({
    width: ref.current.offsetWidth,
    height: ref.current.offsetHeight,
  });
  const handleResize = () => setElementSize(getElementSize());

  useEffect(() => {
    if (ref?.current) handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, [ref?.current]);

  return elementSize;
};
