const removeFromLocalStorage = (key : string) : void => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(key);
  }
};

export default removeFromLocalStorage;
