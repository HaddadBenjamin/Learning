const removeFromSessionStorage = (key : string) : void => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(key);
  }
};

export default removeFromSessionStorage;
