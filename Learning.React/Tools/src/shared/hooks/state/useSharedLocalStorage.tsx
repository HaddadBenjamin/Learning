/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import getLocalStorage from '../../utilities/state/localStorage/getLocalStorage';
import setLocalStorage from '../../utilities/state/localStorage/setLocalStorage';
import removeLocalStorage from '../../utilities/state/localStorage/removeLocalStorage';
import useIsomorphicState from './useIsomorphicState';

type UseLocalStorageResponse<T> = [T, (value : T) => void, () => void]

// Équivalent d'un useState pour gérer un état partagé d'une durée de vie infinie tant qu'on clear pas le cache ou qu'on ne vide pas le local storage.
const useSharedLocalStorage = <T, >(key : string, valueIfUndefined : T) : UseLocalStorageResponse<T> => {
  const get = () :T => getLocalStorage(key, valueIfUndefined);
  const set = (value: T) : void => setLocalStorage(key, value);
  const remove = (): void => removeLocalStorage(key);

  const [value, setValue] = useIsomorphicState(get());

  const onStorageChange = (event: StorageEvent) => {
    // Le stringify permet de gérer les types références comme les objets.
    if (event.storageArea === localStorage && event.key === key && event.newValue !== JSON.stringify(value)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setValue(JSON.parse(event.newValue!) as T);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);

    return () => { window.removeEventListener('storage', onStorageChange); };
  }, []);

  return [value, set, remove];
};

export default useSharedLocalStorage;
