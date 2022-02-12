const orderByDesc = <T, >(array: T[], callback: (element: T) => string | number | Date) : T[] =>
  [...array].sort((a, b) => {
    const [left, right] = [callback(a), callback(b)];

    return typeof left === 'string'
      // @ts-ignore
      ? right.localeCompare(left)
      // @ts-ignore
      : right - left;
  })

export default orderByDesc;
