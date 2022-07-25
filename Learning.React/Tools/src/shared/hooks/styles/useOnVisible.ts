import useOnIsVisibleChange from "./useOnIsVisibleChange";
import {MutableRefObject, useEffect} from "react";

const useOnVisible = (
  ref: MutableRefObject<any>,
  onVisible: () => void
) : void =>
{
  const isVisible = useOnIsVisibleChange(ref, false);

  useEffect(() => {
    if (isVisible) onVisible();
  }, [isVisible])
}

export default useOnVisible