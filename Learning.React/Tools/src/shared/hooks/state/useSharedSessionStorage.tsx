import { useEffect } from 'react';
import getSessionStorage from '../../utilities/state/sessionStorage/getSessionStorage';
import setSessionStorage from '../../utilities/state/sessionStorage/setSessionStorage';
import removeSessionStorage from '../../utilities/state/sessionStorage/removeSessionStorage';
import useIsomorphicState from './useIsomorphicState';
import addEnvironmentInKey from '../../utilities/state/addEnvironmentInKey';

type UseSessionStorageResponse<T> = [T, (value : T) => void, () => void]

// Équivalent d'un useState pour gérer un état partagé d'une durée de vie d'une session, c'est à dire, tant qu'on ne ferme pas le navigateur.
const useSharedSessionStorage = <T, >(key : string, valueIfUndefined : T) : UseSessionStorageResponse<T> => {
  const keyWithEnvironment = addEnvironmentInKey(key);

  const get = () :T => getSessionStorage(keyWithEnvironment, valueIfUndefined);
  const set = (value: T) : void => setSessionStorage(keyWithEnvironment, value);
  const remove = (): void => removeSessionStorage(keyWithEnvironment);

  const [value, setValue] = useIsomorphicState(get());

  const onStorageChange = (event: StorageEvent) => {
    // Le stringify permet de gérer les types références comme les objets.
    if (event.storageArea === sessionStorage && event.key === keyWithEnvironment && event.newValue !== JSON.stringify(value)) {
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
