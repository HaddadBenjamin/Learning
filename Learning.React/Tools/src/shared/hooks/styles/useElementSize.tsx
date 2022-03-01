import { useEffect, useState, MutableRefObject } from 'react';

interface ElementSize {
  width: number;
  height: number;
}

export default (ref : MutableRefObject<HTMLElement>): ElementSize => {
  const getElementSize = (): ElementSize => ({
    width: ref.current.offsetWidth,
    height: ref.current.offsetHeight,
  });

  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setElementSize(getElementSize());
    };

    if (ref?.current) {
      setElementSize(getElementSize());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, [ref?.current]);

  return elementSize;
};
