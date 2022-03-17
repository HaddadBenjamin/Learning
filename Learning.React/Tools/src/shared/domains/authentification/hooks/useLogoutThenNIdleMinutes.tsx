import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logoutAction } from '../authentification.action';
import useIdle from "../../../hooks/utilities/useIdle";

const useLogoutThenNIdleMinutes = (minutesToBeIdle = 30) => {
  const isIdle = useIdle(minutesToBeIdle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isIdle) dispatch(logoutAction());
  }, [isIdle]);
};

export default useLogoutThenNIdleMinutes;
