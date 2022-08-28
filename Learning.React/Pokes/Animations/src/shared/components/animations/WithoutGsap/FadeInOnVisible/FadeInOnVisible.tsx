import React, {FC, MutableRefObject, useEffect, useRef} from "react";
import cn from "classnames";
import styles from './FadeInOnVisible.module.scss'
import useOnVisibleChange from "../../../../hooks/useOnIsVisibleChange";

interface Props {
  children?: React.ReactNode,
  className?: string,
  duration?: number,
  animatedOnce?: boolean
}

// animatedOnlyFirstTime
const FadeInOnVisible : FC<Props> = (
{
  className,
  children,
  duration,
  animatedOnce
}) => {
  const ref = useRef() as MutableRefObject<HTMLSpanElement>
  const isVisible = useOnVisibleChange(ref, animatedOnce);

  useEffect(() => { ref?.current?.style?.setProperty('--duration',`${duration}ms`) }, [])

  return <span ref={ref} className={cn(className, isVisible && styles.fadeIn)}>{children}</span>;
}

export default FadeInOnVisible