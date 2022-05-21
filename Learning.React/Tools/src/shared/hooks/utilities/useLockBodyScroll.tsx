import { useLayoutEffect } from 'react';

const useLockBodyScroll = (lock = true) => {
  if (typeof window === 'undefined') return;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks,consistent-return
  useLayoutEffect(() => {
    if (lock) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      // eslint-disable-next-line no-return-assign
      return () => (document.body.style.overflow = originalStyle);
    }
  }, []);
};

export default useLockBodyScroll;
