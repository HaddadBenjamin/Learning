import {useState} from "react";
import getFromLocalStorage from "../../utils/localStorage/getFromLocalStorage";
import setFromLocalStorage from "../../utils/localStorage/setFromLocalStorage";

const useLocalStorage = (key : string, initialValue : any) => {
  const [storedValue, setStoredValue] = useState(() => getFromLocalStorage(key, initialValue));

  const setValue = (value : any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      setFromLocalStorage(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
