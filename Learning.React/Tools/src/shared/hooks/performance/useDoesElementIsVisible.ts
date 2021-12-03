import { useEffect, useState } from 'react';

export default (
  getElement: () => any,
  stopToObserveWhenElementIsVisible: boolean = true
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  const intersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ): void =>
    entries.forEach(entry => {
      const elementIsVisible =
        entry.isIntersecting || entry.intersectionRatio > 0;

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
      }
    );

    intersectionObserver.observe(getElement());

    return (): void => {// eslint-disable-line
      if (getElement()) intersectionObserver.unobserve(getElement());
    };
  }, []);

  return isVisible;
};
