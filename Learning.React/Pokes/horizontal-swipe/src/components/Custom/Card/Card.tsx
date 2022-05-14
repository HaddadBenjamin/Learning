import React, {FC} from "react";
// @ts-ignore
import styles from './Card.module.scss';
import cn from 'classnames';

interface Props
{
  className?: string
}

const Card : FC<Props> = ({className}) =>
  <div className={cn(styles.container, className)}>
  </div>

export default Card;