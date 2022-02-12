// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containsNullOrUndefined = (array : any[]) : boolean => array.some((element) => element === null || element === undefined);

export default containsNullOrUndefined;
