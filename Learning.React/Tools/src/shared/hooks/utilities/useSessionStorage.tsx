/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import getFromSessionStorage from '../../utilities/sessionStorage/getFromSessionStorage';
import removeFromSessionStorage from '../../utilities/sessionStorage/removeFromSessionStorage';
import setFromSessionStorage from '../../utilities/sessionStorage/setFromSessionStorage';

type UseSessionStorageResponse<T> = [T, (value : T) => void, () => void]

// Équivalent à useState pour l'état partagé, équivalent à Redux en une ligne
const useSessionStorage = <T, >(key : string, valueIfUndefined : T) : UseSessionStorageResponse<T> => {
  const get = () :T => getFromSessionStorage(key, valueIfUndefined);
  const set = (value: T) : void => { setValue(value); setFromSessionStorage(key, value); };
  const remove = (): void => removeFromSessionStorage(key);

  const [value, setValue] = useState(get());

  const onStorageChange = (event: StorageEvent) => {
    const { storageArea } = event;
    const newValue = event.newValue as T;

    if (storageArea === sessionStorage && event.key === key && newValue !== value) {
      setValue(newValue);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  return [value, set, remove];
};

export default useSessionStorage;
