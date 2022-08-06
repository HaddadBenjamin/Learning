import React, {
  FC, MutableRefObject, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames/bind';
import cn from 'classnames';
import styles from './Tooltip.module.scss';
import useHover from '../../../hooks/events/useIsHover';

interface Props {
  text : string,
  className?: string,
  triggeredOn? : 'hover' | 'click',
  backgroundColor? : string,
  textColor?: string,
  width? : number,
  isAlwaysShown? : boolean
}

const Tooltip : FC<Props> = ({
  children,
  width = 218,
  backgroundColor = 'blue_dark',
  textColor = 'white',
  text,
  className,
  triggeredOn = 'hover',
  isAlwaysShown,
}) => {
  const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>;
  const arrowRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [showTooltip, setShowTooltip] = useState(false);
  const { hoveredReference: childrenReference, isHover: isChildrenHover } = useHover<HTMLDivElement>();

  const cx = classNames.bind(styles);
  const subContainerClasses = cx('subContainer', `background-color-${backgroundColor}`, `color-${textColor}`);
  const arrowClasses = cx('arrow', `border-color-${backgroundColor}`, `text-color-${backgroundColor}`);

  useEffect(() => {
    if ((showTooltip || isAlwaysShown) && tooltipRef?.current?.clientHeight) {
      tooltipRef.current.style.width = `${width}px`;
      tooltipRef.current.style.left = `${-(width / 2) + ((childrenReference?.current?.offsetWidth ?? 0) / 2)}px`;
      tooltipRef.current.style.top = `${-(tooltipRef.current.clientHeight + 10)}px`;

      arrowRef.current.style.marginTop = '15px';
      arrowRef.current.style.marginLeft = `${(width / 2) - 31}px`;
    }
  }, [tooltipRef?.current?.clientHeight, showTooltip, isAlwaysShown]);

  useEffect(() => {
    if (triggeredOn === 'hover') setShowTooltip(isChildrenHover);
  }, [isChildrenHover]);

  const onChildrenClick = () => {
    if (triggeredOn === 'click') setShowTooltip(!showTooltip);
  };

  return (
    <div className={styles.mainContainer}>
      {(showTooltip || isAlwaysShown) && (
      <div className={cn(styles.container, className)}>
        <div className={subContainerClasses} ref={tooltipRef}>
          {text}
          <div className={arrowClasses} ref={arrowRef} />
        </div>
      </div>
      ) }
      <div
        ref={childrenReference}
        onClick={onChildrenClick}
        onKeyPress={onChildrenClick}
        role='button'
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
