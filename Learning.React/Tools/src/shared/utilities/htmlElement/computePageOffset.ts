import computeScreenOffset from './computeScreenOffset';

interface IComputePageOffsetResponse {
  leftPageOffset: number,
  topPageOffset: number
}

const computePageOffset = (element : HTMLElement) : IComputePageOffsetResponse => {
  const { leftScreenOffset, topScreenOffset } = computeScreenOffset(element);

  return {
    leftPageOffset: leftScreenOffset + window?.scrollX,
    topPageOffset: topScreenOffset + window?.scrollY,
  };
};

export default computePageOffset;
