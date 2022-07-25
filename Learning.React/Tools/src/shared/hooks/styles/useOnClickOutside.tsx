import React, { useEffect } from 'react';

const useOnClickOutside = <T extends HTMLElement>(
  onClickOutsideReference: React.MutableRefObject<T>,
  onClickOutside: () => void,
) : void => {
  useEffect(() => {
    const onMouseDown = (event: MouseEvent): void => {
      if (!onClickOutsideReference.current || onClickOutsideReference.current.contains(event.target as T)) return;

      onClickOutside();
    };

    document.addEventListener('mousedown', onMouseDown);

    return () => document.removeEventListener('mousedown', onMouseDown);
  },
  [onClickOutsideReference, onClickOutside]);
};

export default useOnClickOutside;
