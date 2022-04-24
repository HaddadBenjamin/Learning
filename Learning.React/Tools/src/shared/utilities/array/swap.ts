const swap = <T, >(array : readonly T[], source : T, destination : T) : readonly T[] => array.map((element) =>
  // eslint-disable-next-line no-nested-ternary
  (element === source ? destination
    : element === destination ? source
      : element),
);

export default swap;
