const inverse = <T, >(array: T[]) : T[] => array.reduce<T[]>(
  (accumulator, current) => [current, ...accumulator],
  [],
);

export default inverse;
