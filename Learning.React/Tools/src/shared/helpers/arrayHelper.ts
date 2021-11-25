// eslint-disable-next-line
export const range = (count: number, maximum?: number) =>
  maximum
    ? new Array(maximum - count + 1)
        .fill(0)
        .map((element, index) => index + maximum - count)
    : new Array(count).fill(0).map((element, index) => index + 1);
