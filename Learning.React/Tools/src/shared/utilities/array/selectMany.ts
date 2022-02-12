const selectMany = <T, Y>(array: T[], callback: (element: T) => Y[]) : Y[] => array.map(callback).flat();

export default selectMany;
