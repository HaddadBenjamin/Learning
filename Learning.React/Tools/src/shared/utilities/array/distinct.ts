const distinct = <T, >(array: T[]) : T[] => array.filter(
  (element, index, self) => self.indexOf(element) === index,
);

export default distinct;
