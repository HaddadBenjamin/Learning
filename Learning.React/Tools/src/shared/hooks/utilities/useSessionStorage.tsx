/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import getFromSessionStorage from "../../utilities/sessionStorage/getFromSessionStorage";
import setFromSessionStorage from "../../utilities/sessionStorage/setFromSessionStorage";
import removeFromSessionStorage from "../../utilities/sessionStorage/removeFromSessionStorage";

// Équivalent à useState pour l'état partagé, équivalent à Redux en une ligne
const useSessionStorage = (key : string, initialValue : any) => {
  const [storedValue, setStoredValue] = useState(() => getFromSessionStorage(key, initialValue));

  const setValue = (value : any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      setFromSessionStorage(key, valueToStore);
      // eslint-disable-next-line no-empty
    } catch (error) { }
  };

  const removeValue = () : void => removeFromSessionStorage(key);

  return [storedValue, setValue, removeValue];
};

export default useSessionStorage;
