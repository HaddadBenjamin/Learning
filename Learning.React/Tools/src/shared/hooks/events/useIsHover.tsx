import { useEffect, useRef, useState } from 'react';

const useIsHover = <T extends HTMLElement, >() => {
  const [isHover, setIsHover] = useState(false);
  const hoveredReference = useRef<T>(null);

  const handleMouseOver = () => setIsHover(true);
  const handleMouseOut = () => setIsHover(false);

  useEffect(
    // eslint-disable-next-line consistent-return
    () => {
      const node = hoveredReference.current;

      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hoveredReference.current], // Recall only if ref changes
  );

  return { hoveredReference, isHover };
};

export default useIsHover;
