import { useEffect } from 'react';
import getCookie from '../../utilities/state/cookies/getCookie';
import setCookie from '../../utilities/state/cookies/setCookie';
import { IDuration } from '../../utilities/type/date/addDuration';
import useCSRAndSSRState from './useCSRAndSSRState';

const COOKIE_STORAGE_AREA = 'cookie';
type UseSharedCookieStateResponse = [string|undefined, (value: string) => void]

export const getSharedCookieState = (key: string, duration: IDuration, valueIfUndefined?: string): string | undefined => {
  const value = getCookie(key);

  if (!value && valueIfUndefined) setShareCookieState(key, valueIfUndefined, duration);

  return value ?? valueIfUndefined;
};

export const setShareCookieState = (key : string, value: string, duration: IDuration) : void => {
  setCookie(key, value, duration);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.dispatchEvent(new StorageEvent('storage', { key, newValue: value, storageArea: COOKIE_STORAGE_AREA }));
};

interface IUseSharedCookieState {
  key: string,
  duration?: IDuration,
  valueIfUndefined?: string
}
const useSharedCookieState = ({ key, duration = { days: 1 }, valueIfUndefined } : IUseSharedCookieState) : UseSharedCookieStateResponse => {
  const get = () : string|undefined => getSharedCookieState(key, duration, valueIfUndefined);
  const set = (value: string) : void => setShareCookieState(key, value, duration);

  const [value, setValue] = useCSRAndSSRState(get());

  const onStorageChange = ({ storageArea, key: eventKey, newValue }: StorageEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (storageArea === COOKIE_STORAGE_AREA && eventKey === key && newValue) {
      console.log('COOKIE SET VALUE', eventKey, newValue);
      setValue(newValue);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);

    return () => { window.removeEventListener('storage', onStorageChange); };
  }, []);

  return [value, set];
};

export default useSharedCookieState;
