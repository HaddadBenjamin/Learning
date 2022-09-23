/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

// Fonctionne pas en SSR tant que le composant n'est pas monté
export const getFromSessionStorage = <T,>(key : string, initialState : T) : T => {
  if (typeof window === 'undefined') return initialState;

  try {
    const item = window.sessionStorage.getItem(key);

    return item ? JSON.parse(item) : initialState;
  } catch (error) {
    return initialState;
  }
};

export const setFromSessionStorage = <T,>(key : string, data : T) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const removeFromSessionStorage = (key : string) : void => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(key);
  }
};

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
