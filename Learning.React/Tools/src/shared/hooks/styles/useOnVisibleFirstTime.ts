import { MutableRefObject, useEffect } from 'react';
import useOnIsVisibleChange from './useOnIsVisibleChange';

const useOnVisibleFirstTime = <THtmlElement extends HTMLElement>(
  ref: MutableRefObject<THtmlElement>,
  onFirstTimeVisible: () => void,
) : void => {
  const isVisible = useOnIsVisibleChange(ref, true);

  useEffect(() => {
    if (isVisible) onFirstTimeVisible();
  }, [isVisible]);
};

export default useOnVisibleFirstTime;
