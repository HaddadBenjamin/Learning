import { useState } from 'react';
import useWindowEvent from './useWindowEvent';

const computeIsOnline = () => (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
  ? navigator.onLine
  : true);

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(computeIsOnline());

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useWindowEvent('online', setOnline);
  useWindowEvent('offline', setOffline);

  return isOnline;
};

export default useIsOnline;
