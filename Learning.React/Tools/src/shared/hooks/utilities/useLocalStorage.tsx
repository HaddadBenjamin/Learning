/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import getFromLocalStorage from '../../utilities/localStorage/getFromLocalStorage';
import setFromLocalStorage from '../../utilities/localStorage/setFromLocalStorage';
import deleteFromLocalStorage from '../../utilities/localStorage/deleteFromLocalStorage';
import useOnSSR from './useOnSSR';

type UseLocalStorageResponse<T> = [T, (value : T) => void, () => void]

// Équivalent d'un useState pour gérer un état partagé d'une durée de vie infinie tant qu'on clear pas le cache ou qu'on ne vide pas le local storage.
const useLocalStorage = <T, >(key : string, valueIfUndefined : T) : UseLocalStorageResponse<T> => {
  const get = () :T => getFromLocalStorage(key, valueIfUndefined);
  const set = (value: T) : void => setFromLocalStorage(key, value);
  const remove = (): void => deleteFromLocalStorage(key);

  const [value, setValue] = useState(get());

  useOnSSR({ onSSR: () => setValue(get()) });

  const onStorageChange = (event: StorageEvent) => {
    // Le stringify permet de gérer les types références comme les objets.
    if (event.storageArea === localStorage && event.key === key && event.newValue !== JSON.stringify(value)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setValue(JSON.parse(event.newValue!) as T);
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
