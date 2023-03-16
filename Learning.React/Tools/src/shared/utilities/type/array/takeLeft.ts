// Ex : [1,2,3] => [1], [1,2,3,4] => [1,2]
//      ([1,2,3], 0) => [], ([1,2,3], 1) => [1], (([1,2,3], 3) => [1,2, 3]
const takeLeft = <T, >(array: T[], index = -1) : T[] => (index === -1
  ? array.filter((_, i) => i < array.length / 2 - (array.length % 2 === 1 ? 1 : 0))
  : array.filter((_, i) => i < index));

export default takeLeft;
