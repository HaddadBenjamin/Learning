import { useState } from 'react';
import useDoesElementIsVisible from './useDoesElementIsVisible';

export default (
  getElement: () => any,
  onElementIsVisible: () => void,
  stopToObserveWhenElementIsVisible = true,
): boolean => {
  const [elementIsVisible, setElementIsVisible] = useState(false);
  const isVisible = useDoesElementIsVisible(
    getElement,
    stopToObserveWhenElementIsVisible,
  );

  if (isVisible && !elementIsVisible) {
    onElementIsVisible();
    setElementIsVisible(true);
  }
  return elementIsVisible;
};
