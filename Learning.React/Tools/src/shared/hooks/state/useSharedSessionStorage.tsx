import { useEffect } from 'react';
import getFromSessionStorage from '../../utilities/state/sessionStorage/getFromSessionStorage';
import removeFromSessionStorage from '../../utilities/state/sessionStorage/removeFromSessionStorage';
import setFromSessionStorage from '../../utilities/state/sessionStorage/setFromSessionStorage';
import useCSRAndSSRState from './useCSRAndSSRState';

type UseSessionStorageResponse<T> = [T, (value : T) => void, () => void]

// Équivalent d'un useState pour gérer un état partagé d'une durée de vie d'une session, c'est à dire, tant qu'on ne ferme pas le navigateur.
const useSharedSessionStorage = <T, >(key : string, valueIfUndefined : T) : UseSessionStorageResponse<T> => {
  const get = () :T => getFromSessionStorage(key, valueIfUndefined);
  const set = (value: T) : void => setFromSessionStorage(key, value);
  const remove = (): void => removeFromSessionStorage(key);

  const [value, setValue] = useCSRAndSSRState(get());

  const onStorageChange = (event: StorageEvent) => {
    // Le stringify permet de gérer les types références comme les objets.
    if (event.storageArea === sessionStorage && event.key === key && event.newValue !== JSON.stringify(value)) {
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

export default useSharedSessionStorage;
