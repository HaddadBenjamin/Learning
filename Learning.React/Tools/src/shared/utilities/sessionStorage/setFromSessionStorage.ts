const setFromSessionStorage = <T>(key : string, data : T) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export default setFromSessionStorage;
