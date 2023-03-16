import { useEffect, useRef } from 'react';

// Appele une fonction tout les n intervalles de temps.
// EX :
//  const [seconds, setSeconds] = React.useState(0);
//  useInterval(() => { setSeconds(seconds + 1); }, 1000);
const useInterval = (callback: () => void, delayAsMilliseconds: number) : void => {
  const onInterval = useRef<() => void>();

  useEffect(() => { onInterval.current = callback; }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (delayAsMilliseconds !== null) {
      const id = setInterval(() => onInterval?.current?.(), delayAsMilliseconds);
      return () => clearInterval(id);
    }
  }, [delayAsMilliseconds]);
};

export default useInterval;
