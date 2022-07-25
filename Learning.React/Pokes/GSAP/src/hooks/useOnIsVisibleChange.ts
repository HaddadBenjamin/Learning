import {MutableRefObject, useEffect, useState} from 'react';

const useOnVisibleChange = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: MutableRefObject<any>,
  stopToObserveWhenElementIsVisible = true,
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  const intersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ): void => entries.forEach((entry) => {
    const elementIsVisible = entry.isIntersecting || entry.intersectionRatio > 0;

    if (elementIsVisible) {
      if (stopToObserveWhenElementIsVisible) observer.unobserve(entry.target);
      setIsVisible(true);
    }
    else setIsVisible(false);
  });

  useEffect(() => {
    if (!ref.current) return;

    const intersectionObserver = new IntersectionObserver(
      intersectionObserverCallback,
      {
        rootMargin: '50px',
        threshold: 0.01,
      },
    );

    intersectionObserver.observe(ref.current);

    return (): void => {// eslint-disable-line
      if (ref.current) intersectionObserver.unobserve(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isVisible;
};

export default useOnVisibleChange