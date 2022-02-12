const chunk = <T, >(array: T[], chunkLenght : number) : T[][] =>
  array.reduce((all, one, i) => {
    const chunkSize = Math.floor(i / chunkLenght);
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    all[chunkSize] = [].concat((all[chunkSize] || []), one);
    return all
  }, [])

export default chunk;
