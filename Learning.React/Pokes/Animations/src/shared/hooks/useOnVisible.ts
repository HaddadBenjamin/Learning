import useOnIsVisibleChange from "./useOnIsVisibleChange";
import {MutableRefObject, useEffect} from "react";

// Se déclenche à chaque fois qu'un élément est visible
const useOnVisible = <THtmlElement extends HTMLElement>(
  ref: MutableRefObject<THtmlElement>,
  onVisible: () => void
) : void =>
{
  const isVisible = useOnIsVisibleChange(ref, false);

  useEffect(() => {
    if (isVisible) onVisible();
  }, [isVisible])
}

export default useOnVisible