import setFromSessionStorage from './setFromSessionStorage';

const getFromSessionStorage = <T>(key : string, valueIfUndefined : T) : T => {
  if (typeof window === 'undefined') return valueIfUndefined;

  try {
    const item = window.sessionStorage.getItem(key);

    if (item) return JSON.parse(item) as T;

    setFromSessionStorage(key, valueIfUndefined);
    return valueIfUndefined;
  } catch (error) {
    return valueIfUndefined;
  }
};

export default getFromSessionStorage;
