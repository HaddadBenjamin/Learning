// eslint-disable-next-line @typescript-eslint/no-explicit-any
const excludeNullOrUndefined = <T>(array : T[]) : T[] => array.filter((element) => element !== null && element !== undefined);

export default excludeNullOrUndefined;
