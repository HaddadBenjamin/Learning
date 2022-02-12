const select = <T, Y>(array: T[], callback: (element: T) => Y) : Y[] => array.map(callback);

export default select;
