const doesKeyExistsInLocalStorage = (key : string) : boolean =>
    localStorage.getItem(key) !== null

export const getOrDefaultDataFromLocalStorage = <T>(key : string, initialValue : T) : T =>
    doesKeyExistsInLocalStorage(key) ?
    JSON.parse(localStorage.getItem(key) as string) as T :
    initialValue

export const setLocalStorageData = <T>(key : string, value : T) : void =>
    localStorage.setItem(key, JSON.stringify(value))