// eslint-disable-next-line @typescript-eslint/no-explicit-any
const excludeNullOrUndefined = (array : any[]) : any[] => array.filter((element) => element !== null && element !== undefined);

export default excludeNullOrUndefined;
