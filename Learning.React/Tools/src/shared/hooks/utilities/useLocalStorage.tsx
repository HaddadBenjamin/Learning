/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import getFromLocalStorage from '../../utilities/localStorage/getFromLocalStorage';
import setFromLocalStorage from '../../utilities/localStorage/setFromLocalStorage';
import deleteFromLocalStorage from '../../utilities/localStorage/deleteFromLocalStorage';

type UseLocalStorageResponse<T> = [() => T, (value : T) => void, () => void]

// Équivalent à useState pour l'état partagé, équivalent à Redux en une ligne
const useLocalStorage = <T, >(key : string, initialValue : T) : UseLocalStorageResponse<T> => {
  const get = () :T => getFromLocalStorage(key, initialValue);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const set = (value: T) : void => { setValue(value); setFromLocalStorage(key, value); };
  const remove = (): void => deleteFromLocalStorage(key);

  // Permet juste pour rerendre le composant lors d'un appel à setValueFromLocalStorage
  const [, setValue] = useState(get());

  return [get, set, remove];
};

export default useLocalStorage;
