const getFromLocalStorage = <T>(key : string, initialState : T) : T => {
  if (typeof window === 'undefined') return initialState;

  try {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) as T : initialState;
  } catch (error) {
    console.log(error);

    return initialState;
  }
};

export default getFromLocalStorage;
