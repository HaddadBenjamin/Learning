import { MutableRefObject, useRef, useState } from 'react';
import useOnVisibleChange from '../styles/useOnIsVisibleChange';

interface IUseLazyImageResponse {
  imgRef: MutableRefObject<HTMLElement>,
  isVisible: boolean,
  imageIsLoaded : boolean
  onImageLoad : () => void
}

const useLazyImage = (condition?: boolean) : IUseLazyImageResponse => {
  const imgRef = useRef() as MutableRefObject<HTMLElement>;
  const isVisible = useOnVisibleChange(imgRef, true);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const onImageLoad = () : void => setImageIsLoaded(true);

  return {
    imgRef,
    isVisible: isVisible && !!condition,
    imageIsLoaded,
    onImageLoad,
  } as const;
};

export default useLazyImage;
