const paginate = <T, >(array: T[], page: number, pageSize: number) : T[] =>
  array.slice(pageSize * (page - 1)).slice(0, pageSize);

export default paginate;
