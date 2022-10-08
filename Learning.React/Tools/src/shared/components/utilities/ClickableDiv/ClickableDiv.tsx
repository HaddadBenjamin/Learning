import React, { FC, PointerEventHandler } from 'react';
import cn from 'classnames';
import styles from './ClickableDiv.module.scss';

interface Props {
  onClick: PointerEventHandler<HTMLDivElement> | undefined,
  className?: string,
}

const ClickableDiv : FC<Props> = ({ onClick, className, children }) => (
  <div
    onPointerDown={onClick} // Gère le click, le touch mobile et au pinceau, évite de définir onClick & onKeyDown.
    role='button'
    tabIndex={0}
    className={cn(className, styles.container)}
  >
    {children}
  </div>
);

export default ClickableDiv;
