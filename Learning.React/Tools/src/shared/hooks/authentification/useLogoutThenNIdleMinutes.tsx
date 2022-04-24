import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useIdle from '../utilities/useIdle';
import { logoutAction } from '../../domains/authentification/authentification.action';

const useLogoutThenNIdleMinutes = (minutesToBeIdle = 30) => {
  const isIdle = useIdle(minutesToBeIdle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isIdle) dispatch(logoutAction());
  }, [isIdle]);
};

export default useLogoutThenNIdleMinutes;
