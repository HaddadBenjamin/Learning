import { getOrDefaultDataFromLocalStorage, setLocalStorageData } from '../domains/localStorage/localStorage.util'

export const useLocalStorage = <T>(key : string, initialValue : T) =>
{
  const get = () => getOrDefaultDataFromLocalStorage(key, initialValue)
  const set = (value : T) => setLocalStorageData(key, value)

  return [get, set]
}