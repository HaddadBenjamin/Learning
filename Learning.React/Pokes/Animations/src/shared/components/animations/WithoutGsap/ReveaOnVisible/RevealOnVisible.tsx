import React, {
  FC, MutableRefObject, useEffect, useRef,
} from 'react';
import cn from 'classnames';
import styles from './RevealOnVisible.module.scss';
import useOnVisibleChange from "../../../../hooks/useOnIsVisibleChange";

interface Props {
  children?: React.ReactNode,
  className?: string,
  animatedOnce?: boolean,
  duration?: number,
  distance?: string,
  backgroundColor?: string,
  direction?: 'up' | 'right' | 'down' | 'left'
}

const RevealOnVisible : FC<Props> = (
  {
    className,
    children,
    animatedOnce,
    duration,
    distance,
    backgroundColor,
    direction,
  }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const isVisible = useOnVisibleChange(ref, animatedOnce);

  useEffect(() => {
    if (duration) ref?.current?.style?.setProperty('--duration', `${duration}ms`);
    if (distance) ref?.current?.style?.setProperty('--distance', distance);
    if (backgroundColor) ref?.current?.style?.setProperty('--background-color', backgroundColor);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        isVisible && direction === 'up' && styles.revealUp,
        isVisible && direction === 'right' && styles.revealRight,
        isVisible && direction === 'down' && styles.revealDown,
        isVisible && direction === 'left' && styles.revealLeft,
      )}
    >
      {children}
    </div>
  );
};

export default RevealOnVisible;
