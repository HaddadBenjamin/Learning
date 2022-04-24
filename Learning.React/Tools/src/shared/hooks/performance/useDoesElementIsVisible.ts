import { useEffect, useState } from 'react';

export default (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getElement: () => any,
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
  });

  useEffect(() => {
    if (!getElement()) return;

    const intersectionObserver = new IntersectionObserver(
      intersectionObserverCallback,
      {
        rootMargin: '50px',
        threshold: 0.01,
      },
    );

    intersectionObserver.observe(getElement());

    return (): void => {// eslint-disable-line
      if (getElement()) intersectionObserver.unobserve(getElement());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isVisible;
};
