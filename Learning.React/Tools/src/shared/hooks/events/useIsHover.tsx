import {
  useEffect, useRef, useState, RefObject,
} from 'react';

interface IUseHoverResponse<T extends HTMLElement> {
  hoveredReference : RefObject<T>,
  isHover : boolean
}

const useHover = <T extends HTMLElement, >() : IUseHoverResponse<T> => {
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
    [hoveredReference.current], // Recall only if ref changes
  );

  return { hoveredReference, isHover };
};

export default useHover;
