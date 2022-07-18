import setFromSessionStorage from './setFromSessionStorage';

const getFromSessionStorage = <T>(key : string, initialState : T) : T => {
  if (typeof window === 'undefined') return initialState;

  try {
    const item = window.sessionStorage.getItem(key);

    if (item) return JSON.parse(item) as T;

    setFromSessionStorage(key, initialState);
    return initialState;
  } catch (error) {
    return initialState;
  }
};

export default getFromSessionStorage;
