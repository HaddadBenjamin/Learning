import {MutableRefObject, useEffect, useState} from 'react';

export const useDoesRefIsVisible = (ref : MutableRefObject<any>) =>
{
  const [isVisible, setIsVisible] = useState(false);

  const intersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) : void =>
      entries.forEach(entry =>
      {
        const refIsVisible = entry.isIntersecting || entry.intersectionRatio > 0

        if (refIsVisible)
        {
          observer.unobserve(entry.target);
          setIsVisible(true)
        }
      })
  const intersectionObserverOptions : IntersectionObserverInit = { rootMargin: '50px', threshold: 0.01 }

  useEffect(() =>
  {
    let intersectionObserver = new IntersectionObserver(intersectionObserverCallback, intersectionObserverOptions)

    intersectionObserver.observe(ref.current);

    return () => { intersectionObserver.unobserve(ref.current) };
  }, []);

  return isVisible
};
