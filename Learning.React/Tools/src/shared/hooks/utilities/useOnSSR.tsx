import { useEffect, useState } from 'react';

interface IUseSSRParameters { onSSR?: () => void }

const useOnSSR = (parameters? : IUseSSRParameters) : boolean => {
  // On ne retourne pas directement la valeur de sorte que ce calcul soit fait qu'uniquement avant le montage.
  const [isSSR] = useState(typeof window === 'undefined');

  useEffect(() => {
    if (isSSR) parameters?.onSSR?.();
  }, []);

  return isSSR;
};

export default useOnSSR;
