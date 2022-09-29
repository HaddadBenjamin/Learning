const setFromSessionStorage = <T>(key : string, data : T) => {
  if (typeof window !== 'undefined') {
    const oldValue = window.sessionStorage.getItem(key);
    const newValue = JSON.stringify(data);

    window.sessionStorage.setItem(key, newValue);
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      oldValue,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newValue: data,
      storageArea: sessionStorage,
    }));
  }
};

export default setFromSessionStorage;
