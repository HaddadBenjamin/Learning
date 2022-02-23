import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import createActivityDetector from 'activity-detector';

const MILLISECONDS_IN_ONE_MINUTE = 60000;

// Détecte si l'utilsiateur est inactif, ex : isIdle = useIdle(30)
const useIdle = (minutesToBeIdle : number) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const activityDetector = createActivityDetector({ timeToIdle: minutesToBeIdle * MILLISECONDS_IN_ONE_MINUTE });

    activityDetector.on('idle', () => setIsIdle(true));
    activityDetector.on('active', () => setIsIdle(false));

    return () => activityDetector.stop();
  });

  return isIdle;
};

export default useIdle;
