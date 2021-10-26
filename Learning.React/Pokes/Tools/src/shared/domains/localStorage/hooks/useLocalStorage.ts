import {
  getOrDefaultDataFromLocalStorage,
  setLocalStorageData,
} from "../localStorage.util";

export default <T>(key: string, initialValue: T) => {
  const get = () => getOrDefaultDataFromLocalStorage(key, initialValue);
  const set = (value: T) => setLocalStorageData(key, value);

  return [get, set];
};
