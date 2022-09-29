const setFromLocalStorage = <T>(key : string, data : T) => {
  if (typeof window !== 'undefined') {
    const oldValue = window.localStorage.getItem(key);
    const newValue = JSON.stringify(data);

    window.localStorage.setItem(key, newValue);
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      oldValue,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newValue: data,
      storageArea: localStorage,
    }));
  }
};

export default setFromLocalStorage;
