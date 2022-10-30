import setFromLocalStorage from './setFromLocalStorage';

const getFromLocalStorage = <T>(key : string, valueIfUndefined : T) : T => {
  if (typeof window === 'undefined') return valueIfUndefined;

  try {
    const item = window.localStorage.getItem(key);

    if (item) return JSON.parse(item) as T;

    setFromLocalStorage(key, valueIfUndefined);
    return valueIfUndefined;
  } catch (error) {
    console.log(error);

    return valueIfUndefined;
  }
};

export default getFromLocalStorage;
