import { useEffect, useState } from 'react';
import useOnSSR from '../utilities/useOnSSR';

// Optimisation possible : passer en paramètre un throttleValue, valeur par défault = 300, mais créera une dépendance à Lodash.
export default () : number => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => setScrollPosition(window.pageYOffset);

  useOnSSR({ onSSR: handleScroll });

  useEffect(() => {
    // Fonctionne en SSR car le composant est monté à ce moment
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};
