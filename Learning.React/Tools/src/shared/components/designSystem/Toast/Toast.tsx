import React, {
  FC, useRef, useEffect, MutableRefObject,
} from 'react';
import cn from 'classnames';
import styles from './Toast.module.scss';
import ClickableDiv from '../../utilities/ClickableDiv/ClickableDiv';

interface Props {
  type?: 'success' | 'warning' | 'error'
  text: string
  duration?: number
  withRegressionbar?: boolean
  onClickCross?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const Toast: FC<Props> = ({
  type = 'success',
  text,
  duration = 4,
  withRegressionbar = true,
  onClickCross,
}) => {
  const regressionBarRef = useRef() as MutableRefObject<HTMLDivElement>;
  const alertRef = useRef() as MutableRefObject<HTMLDivElement>;

  const startRegressionBar = () => {
    let alertWidth = alertRef.current.offsetWidth;

    const setIntervalId = setInterval(() => {
      if (alertWidth === 0) clearInterval(setIntervalId);
      else {
        alertWidth -= 1;
        if (regressionBarRef?.current?.style) regressionBarRef.current.style.width = `${alertWidth}px`;
      }
    }, (1000 / alertWidth) * duration);
  };

  useEffect(() => { startRegressionBar(); }, []);

  return (
    <div className={styles.container} ref={alertRef}>
      <div className={cn(styles.alert, type === 'success' && styles.success, type === 'warning' && styles.warning, type === 'error' && styles.error)}>
        {type === 'success' ? 'success icon' : type === 'warning' ? 'warning icon' : 'close icon'}
        {text}
        <ClickableDiv onClick={onClickCross} className={styles.cross}>X</ClickableDiv>
        {withRegressionbar && <div ref={regressionBarRef} className={styles.regressionBar} />}
      </div>
    </div>
  );
};

export default Toast;
