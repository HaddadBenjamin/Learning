import setFromLocalStorage from './setFromLocalStorage';

const getFromLocalStorage = <T>(key : string, initialState : T) : T => {
  if (typeof window === 'undefined') return initialState;

  try {
    const item = window.localStorage.getItem(key);

    if (item) return JSON.parse(item) as T;

    setFromLocalStorage(key, initialState);
    return initialState;
  } catch (error) {
    console.log(error);

    return initialState;
  }
};

export default getFromLocalStorage;
