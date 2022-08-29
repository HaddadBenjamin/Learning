import useOnIsVisibleChange from "./useOnIsVisibleChange";
import {MutableRefObject, useEffect} from "react";

interface IUseOnVisibleParameters<THtmlElement extends HTMLElement> {
  ref: MutableRefObject<THtmlElement>,
  offset?: number,
  onVisible: () => void
}

// Se déclenche à chaque fois qu'un élément est visible
const useOnVisible = <THtmlElement extends HTMLElement>(
{
  ref,
  onVisible,
  offset
}: IUseOnVisibleParameters<HTMLElement>) : void =>
{
  const isVisible = useOnIsVisibleChange({ ref, stopToObserveWhenElementIsVisible : false, offset});

  useEffect(() => {
    if (isVisible) onVisible();
  }, [isVisible])
}

export default useOnVisible