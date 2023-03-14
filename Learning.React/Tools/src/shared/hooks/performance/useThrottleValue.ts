import { useEffect, useRef, useState } from 'react';

// Le debounce permet d'appeller une fonction qu'une fois tous les n temps
// Ex :
//  const [value, setValue] = useState('default value')
//  const throttleValue = useThrottleValue(value) => throttleValue se met moins souvent à jour que value
//  <input value={value} onChange={(e) => setValue(e.target.value)} />;
//  console.log(value, throttleValue) => throttleValue se met moins souvent à jour que value
// Voir aussi useThrottleState => const [value, setValue, throtleValue] = useThrottleState('default value')
const useThrottle = <T>(value: T, intervalAsMilliseconds = 500): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecutionTime = useRef<number>(Date.now());

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (Date.now() >= lastExecutionTime.current + intervalAsMilliseconds) {
      lastExecutionTime.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecutionTime.current = Date.now();
        setThrottledValue(value);
      }, intervalAsMilliseconds);

      return () => clearTimeout(timerId);
    }
  }, [value, intervalAsMilliseconds]);

  return throttledValue;
};

export default useThrottle;
