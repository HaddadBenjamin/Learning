const orderBy = <T, >(array: T[], callback: (element: T) => string | number | Date) : T[] => [...array].sort((a, b) => {
  const [left, right] = [callback(a), callback(b)];

  return typeof left === 'string'
  // @ts-ignore
    ? left.localeCompare(right)
  // @ts-ignore
    : left - right;
});

export default orderBy;
