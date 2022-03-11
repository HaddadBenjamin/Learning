/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import getFromLocalStorage from "../../utilities/localStorage/getFromLocalStorage";
import setFromLocalStorage from "../../utilities/localStorage/setFromLocalStorage";
import deleteFromLocalStorage from "../../utilities/localStorage/deleteFromLocalStorage";

const useLocalStorage = (key : string, initialValue : any) => {
  const [storedValue, setStoredValue] = useState(() => getFromLocalStorage(key, initialValue));

  const setValue = (value : any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      setFromLocalStorage(key, valueToStore);
      // eslint-disable-next-line no-empty
    } catch (error) { }
  };

  const removeValue = () : void => deleteFromLocalStorage(key);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
