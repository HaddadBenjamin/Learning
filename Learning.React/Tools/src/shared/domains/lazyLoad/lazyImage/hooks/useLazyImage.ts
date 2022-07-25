import { useRef, useState } from 'react';
import useDoesRefIsVisible from '../../../../hooks/styles/useDoesRefIsVisible';

const useLazyImage = (condition = true) => {
  const imgRef = useRef(null);
  const isVisible = useDoesRefIsVisible(imgRef);
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
