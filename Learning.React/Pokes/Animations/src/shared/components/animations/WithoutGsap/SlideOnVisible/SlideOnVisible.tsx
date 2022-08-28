import React, {FC, MutableRefObject, useEffect, useRef} from "react";
import cn from "classnames";
import styles from './SlideOnVisible.module.scss'
import useOnVisibleChange from "../../../../hooks/useOnIsVisibleChange";

interface Props {
  children?: React.ReactNode,
  className?: string,
  animatedOnce?: boolean,
  duration?: number,
  distance?: string,
  direction?: 'up' | 'right' | 'down' | 'left'
}

const SlideOnVisible : FC<Props> = (
{
  className,
  children,
  animatedOnce,
  duration,
  distance,
  direction= 'up'
}) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const isVisible = useOnVisibleChange(ref, animatedOnce);

  useEffect(() => {
    if (!!duration) ref?.current?.style?.setProperty('--duration',`${duration}ms`)
    if (!!distance) ref?.current?.style?.setProperty('--distance', distance)
  }, [])

  return <div ref={ref} className={cn(className, styles.slideContainer)}>
    <div className={cn(
      className,
      isVisible && direction === 'up' && styles.slideUp,
      isVisible && direction === 'right' && styles.slideRight,
      isVisible && direction === 'down' && styles.slideDown,
      isVisible && direction === 'left' && styles.slideLeft
    )}>
      {children}
    </div>
  </div>;
}

export default SlideOnVisible