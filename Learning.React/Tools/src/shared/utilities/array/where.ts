const where = <T, >(array: T[], predicate: (element: T) => boolean) : T[] => array.filter(predicate);

export default where;
