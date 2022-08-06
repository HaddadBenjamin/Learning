import { MutableRefObject, useRef, useState } from 'react';
import useOnVisibleChange from '../../../../hooks/styles/useOnIsVisibleChange';

const useLazyImage = (condition?: boolean) => {
  const imgRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isVisible = useOnVisibleChange(imgRef, true);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const onImageLoad = () => setImageIsLoaded(true);

  return {
    imgRef,
    isVisible: isVisible && !!condition,
    imageIsLoaded,
    onImageLoad,
  } as const;
};

export default useLazyImage;
