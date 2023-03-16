// Ex : [1,2,3] => [3], [1,2,3,4] => [3,4]
//      ([1,2,3], -1) => [1,2,3], [1,2,3], 0) => [2,3], [1,2,3], 1) => [3]
const takeRight = <T, >(array: T[], index = -2) : T[] => (index === -2
  ? array.filter((_, i) => i + 1 > array.length / 2 - (array.length % 2 === 1 ? -1 : 0))
  : array.filter((_, i) => i > index));
export default takeRight;
