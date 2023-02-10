import React, { forwardRef, ReactNode } from 'react';
import cn from 'classnames';
import styles from './ClickableDiv.module.scss';

interface Props {
  onClick?: () => void,
  className?: string,
  children: ReactNode
}

const ClickableDiv = forwardRef<HTMLDivElement, Props>((
  {
    children,
    className,
    onClick,
  },
  ref,
) => (
  <div
    className={cn(styles.container, className)}
    onClick={onClick}
    onKeyPress={onClick}
    ref={ref}
    role='button'
    tabIndex={0}
  >
    {children}
  </div>
));

export default ClickableDiv;
