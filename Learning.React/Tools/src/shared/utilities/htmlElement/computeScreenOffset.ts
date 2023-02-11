interface IComputeScreenOffsetResponse {
  leftScreenOffset: number,
  topScreenOffset: number
}

const computeScreenOffset = (element : HTMLElement) : IComputeScreenOffsetResponse => {
  const { left, top } = element?.getBoundingClientRect();

  return {
    leftScreenOffset: left,
    topScreenOffset: top,
  };
};

export default computeScreenOffset;
