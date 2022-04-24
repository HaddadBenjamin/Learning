import { useEffect, RefObject } from 'react';

export default (ref: RefObject<HTMLElement>, callback: () => void): void => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onClickAway = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    };

    window.addEventListener('mousedown', onClickAway);

    return () => window.removeEventListener('mousedown', onClickAway);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};
