import { useEffect, useRef } from 'react';

// S'execute lors du componentDidUpdate.
// Ne s'éxécute pas lors du componentDidMount.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEffectOnUpdate = (callback : () => void, ...dependencies : any[]) => {
  const hasBeenMounted = useRef(true);

  useEffect(() => {
    if (!hasBeenMounted.current) callback();

    hasBeenMounted.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useEffectOnUpdate;
