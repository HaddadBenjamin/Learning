const deleteFromLocalStorage = (key : string) : void => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
};

export default deleteFromLocalStorage;
