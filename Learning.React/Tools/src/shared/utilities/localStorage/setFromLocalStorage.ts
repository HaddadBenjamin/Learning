const setFromLocalStorage = <T>(key : string, data : T) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
};

export default setFromLocalStorage;
