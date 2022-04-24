import { MutableRefObject } from 'react';
import useWhenElementIsVisible from './useWhenElementIsVisible';

export default (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: MutableRefObject<any>,
  onElementIsVisible: () => void,
  stopToObserveWhenElementIsVisible = true,
): boolean => useWhenElementIsVisible(
  () => ref.current,
  onElementIsVisible,
  stopToObserveWhenElementIsVisible,
);
