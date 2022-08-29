import React, {
  FC, MutableRefObject, useEffect, useRef,
} from 'react';
import cn from 'classnames';
import styles from './ZoomOnVisible.module.scss';
import useOnVisibleChange from '../../../../hooks/styles/useOnIsVisibleChange';

interface Props {
  children?: React.ReactNode,
  className?: string,
  animatedOnce?: boolean,
  duration?: number,
  zoom?: number,
}

const ZoomOnVisible : FC<Props> = (
  {
    className,
    children,
    animatedOnce,
    duration,
    zoom,
  }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const isVisible = useOnVisibleChange(ref, animatedOnce);

  useEffect(() => {
    if (duration) ref?.current?.style?.setProperty('--duration', `${duration}ms`);
    if (zoom) ref?.current?.style?.setProperty('--zoom', zoom.toString());
  }, []);

  return (
    <div ref={ref} className={cn(className, isVisible && styles.zoom)}>
      {children}
    </div>
  );
};

export default ZoomOnVisible;
