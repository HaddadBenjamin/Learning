import React, { FC, KeyboardEventHandler, MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler<HTMLDivElement> | undefined,
  className?: string,
}

const ClickableDiv : FC<Props> = ({ onClick, className, children }) => (
  <div
    onClick={onClick}
    onKeyPress={onClick as KeyboardEventHandler<HTMLDivElement> | undefined}
    role='button'
    tabIndex={0}
    className={className}
  >
    {children}
  </div>
);

export default ClickableDiv;
