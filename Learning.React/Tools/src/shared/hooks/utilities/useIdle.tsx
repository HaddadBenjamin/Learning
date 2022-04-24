import { useEffect, useMemo } from 'react';
import useSessionStorage from './useSessionStorage';

const MILLISECONDS_IN_ONE_MINUTE = 60000;

interface IIdleState {
  isIdle : boolean,
  secondsToBeIdle : number
}

const useIdle = (minutesToBeIdle : number) => {
  // window is not defined using server side rendering
  if (typeof window === 'undefined') return false;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const secondsToBeConsideredAsIdle = useMemo(() => (MILLISECONDS_IN_ONE_MINUTE * minutesToBeIdle) / 1000, [minutesToBeIdle]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [getIdleState, setIdleState] = useSessionStorage('idleState', {
    secondsToBeIdle: 0,
    isIdle: false,
  } as IIdleState);

  const updateIdleState = () => {
    const idleState = getIdleState();
    const isIdle = idleState.secondsToBeIdle >= secondsToBeConsideredAsIdle;

    setIdleState({
      secondsToBeIdle: idleState.secondsToBeIdle + 1,
      isIdle,
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const idleInterval = setInterval(updateIdleState, 1000);

    const onActive = () => setIdleState({
      isIdle: false,
      secondsToBeIdle: 0,
    });

    const events = [
      'mousedown',
      'click',
      'keypress',
      // On pourrait rajouter lse évènements 'move', 'scroll' mais on va éviter de sorte à ne pas surcharger les rendus.
    ];

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    events.forEach((event) => window.addEventListener(event, onActive));

    return () => {
      clearInterval(idleInterval);

      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      events.forEach((event) => window.removeEventListener(event, onActive));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return getIdleState().isIdle;
};

export default useIdle;
