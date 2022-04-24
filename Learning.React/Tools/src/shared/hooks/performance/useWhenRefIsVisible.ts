import { MutableRefObject } from 'react';
import useWhenElementIsVisible from './useWhenElementIsVisible';

export default (
  ref: MutableRefObject<any>,
  onElementIsVisible: () => void,
  stopToObserveWhenElementIsVisible = true,
): boolean => useWhenElementIsVisible(
  () => ref.current,
  onElementIsVisible,
  stopToObserveWhenElementIsVisible,
);
