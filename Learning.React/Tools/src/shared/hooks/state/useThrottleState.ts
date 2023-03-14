import { useEffect, useRef, useState } from 'react';

// Le throttle permet d'appeller une fonction qu'une fois tous les n temps
// Ex :
//  const [value, setValue, throttleValue] = useThrottleState('default value')
//  <input value={value} onChange={(e) => setValue(e.target.value)} />;
//  console.log(value, throttleValue) => throttleValue se met moins souvent à jour que value
const useThrottleState = <T>(initialValue: T, intervalAsMilliseconds = 500): [T, (value: T) => void, T] => {
  const [value, setValue] = useState(initialValue);
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

  return [value, setValue, throttledValue];
};

export default useThrottleState;
