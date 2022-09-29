/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import getFromLocalStorage from '../../utilities/localStorage/getFromLocalStorage';
import setFromLocalStorage from '../../utilities/localStorage/setFromLocalStorage';
import deleteFromLocalStorage from '../../utilities/localStorage/deleteFromLocalStorage';

type UseLocalStorageResponse<T> = [T, (value : T) => void, () => void]

// Équivalent à useState pour l'état partagé, équivalent à Redux en une ligne
const useLocalStorage = <T, >(key : string, valueIfUndefined : T) : UseLocalStorageResponse<T> => {
  const get = () :T => getFromLocalStorage(key, valueIfUndefined);
  const set = (value: T) : void => { setValue(value); setFromLocalStorage(key, value); };
  const remove = (): void => deleteFromLocalStorage(key);

  const [value, setValue] = useState(get());

  const onStorageChange = (event: StorageEvent) => {
    const { storageArea } = event;
    const newValue = event.newValue as T;

    if (storageArea === localStorage && event.key === key && newValue !== value) {
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

export default useLocalStorage;
