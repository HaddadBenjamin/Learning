import React, { useState, useRef, FC } from 'react';
import cn from 'classnames';
import { useDoesRefIsVisible } from '../../../../hooks/useDoesRefIsVisible';
import styles from './LazyImage.module.scss';
import {LazyImageData} from "../lazyImage.model";

interface Props extends LazyImageData
{
  className?: string
}

const LazyImage : FC<Props> = ({ url, width, height, alt, className }) => {
  const imgRef = useRef(null);
  const isVisible = useDoesRefIsVisible(imgRef);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const onImageLoad = () => setImageIsLoaded(true);

  return <div
      className={cn(styles.container, className)}
      ref={imgRef}
      style={{paddingBottom: `${(height / width) * 100}%`, width: '100%'}}
    >
      {isVisible && (
          <img
            className={cn(styles.image, imageIsLoaded && styles.loadedImage)}
            src={url}
            alt={alt}
            onLoad={onImageLoad}
          />
      )}
    </div>
};

export default LazyImage;
