import useOnIsVisibleChange from "./useOnIsVisibleChange";
import {MutableRefObject, useEffect} from "react";

// Se déclenche lorsqu'un élément est visible pour la première fois
const useOnVisibleFirstTime = <THtmlElement extends HTMLElement>(
  ref: MutableRefObject<THtmlElement>,
  onFirstTimeVisible: () => void
) : void =>
{
  const isVisible = useOnIsVisibleChange(ref, true);

  useEffect(() => {
    if (isVisible) onFirstTimeVisible();
  }, [isVisible])
}

export default useOnVisibleFirstTime