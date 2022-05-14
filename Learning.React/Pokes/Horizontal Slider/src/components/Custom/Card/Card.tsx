import React, {FC, MutableRefObject, useEffect, useRef} from "react";
// @ts-ignore
import styles from './Card.module.scss';
import cn from 'classnames';

interface Props
{
  className?: string
  width?: number
}

const Card : FC<Props> = ({className, width = 295}) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    ref.current.style.minWidth = width + 'px';
  }, [ref?.current])
  return <div className={cn(styles.container, className)} ref={ref}/>;
}

export default Card;