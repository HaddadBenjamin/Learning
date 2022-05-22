import React, { FC } from 'react';

interface Props {
  onClick: () => void,
  className?: string,
}

const ClickableDiv : FC<Props> = ({ onClick, className, children }) => <div onClick={onClick} onKeyPress={onClick} role='button' tabIndex={0} className={className}>{children}</div>;

export default ClickableDiv;
