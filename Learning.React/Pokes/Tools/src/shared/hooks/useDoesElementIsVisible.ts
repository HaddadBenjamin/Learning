import {useEffect, useState} from 'react';

export const useDoesElementIsVisible = (
  getElement : () => any,
  stopToObserveWhenElementIsVisible : boolean = true) : boolean =>
{
  const [isVisible, setIsVisible] = useState(false);

  const intersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) : void =>
    entries.forEach(entry =>
    {
      const elementIsVisible = entry.isIntersecting || entry.intersectionRatio > 0

      if (elementIsVisible)
      {
        if (stopToObserveWhenElementIsVisible)
          observer.unobserve(entry.target);
        setIsVisible(true)
      }
    })
  const intersectionObserverOptions : IntersectionObserverInit = { rootMargin: '50px', threshold: 0.01 }

  useEffect(() =>
  {
    if (!getElement()) return

    let intersectionObserver = new IntersectionObserver(intersectionObserverCallback, intersectionObserverOptions)

    intersectionObserver.observe(getElement());

    return () =>
    {
      if (getElement())
        intersectionObserver.unobserve(getElement())
    };
  }, []);

  return isVisible
};
