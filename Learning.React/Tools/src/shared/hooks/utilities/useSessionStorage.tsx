/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import getFromSessionStorage from "../../utilities/sessionStorage/getFromSessionStorage";
import removeFromSessionStorage from "../../utilities/sessionStorage/removeFromSessionStorage";
import setFromSessionStorage from "../../utilities/sessionStorage/setFromSessionStorage";

// eslint-disable-next-line no-unused-vars
type UseSessionStorageResponse<T> = [() => T, (value : T) => void, () => void]

// Équivalent à useState pour l'état partagé, équivalent à Redux en une ligne
const useSessionStorage = <T, >(key : string, initialValue : T) : UseSessionStorageResponse<T> => {
  const get = () :T => getFromSessionStorage(key, initialValue);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const set = (value: T) : void => { setValue(value); setFromSessionStorage(key, value); };
  const remove = (): void => removeFromSessionStorage(key);

  // Permet juste pour rerendre le composant lors d'un appel à setValueFromSessionStorage
  const [, setValue] = useState(get());

  return [get, set, remove];
};

export default useSessionStorage;
