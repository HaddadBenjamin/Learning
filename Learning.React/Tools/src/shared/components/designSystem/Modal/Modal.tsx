import React, {
  FC, MutableRefObject, useEffect, useRef,
} from 'react';
import cn from 'classnames';
import styles from './Modal.module.scss';
import useOnClickOutside from '../../../hooks/events/useOnClickOutside';
import useElementSize from '../../../hooks/styles/useElementSize';
import useLockBodyScroll from '../../../hooks/utilities/useLockBodyScroll';

interface ModalLineProps {
  lineNumber: number
}

interface Props {
  setShowModal: (showModal : boolean) => void,
  title? : string,
  className?: string,
  lockScrollWhenOpen?: boolean,
  closeOnClickOutside?: boolean,
  fixedContainer?: boolean,
  addCloseButton?: boolean,
}

const MODAL_LINE_HEIGHT = 38;
const ModalLine : FC<ModalLineProps> = ({ lineNumber }) => {
  const reference = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    reference.current.style.bottom = `${3 + (lineNumber * MODAL_LINE_HEIGHT)}px`;
  }, []);

  return <div className={styles.titleLine} ref={reference} />;
};

const Modal : FC<Props> = ({
  children,
  setShowModal,
  className,
  title,
  lockScrollWhenOpen = true,
  closeOnClickOutside = true,
  fixedContainer = true,
  addCloseButton = true,
}) => {
  const modalReference = useRef() as MutableRefObject<HTMLDivElement>;
  const { elementReference: titleReference, elementSize: { elementHeight: titleHeight } } = useElementSize<HTMLDivElement>();
  const numberOfTitleLine = titleHeight / MODAL_LINE_HEIGHT;

  useOnClickOutside({ ref: modalReference, onClickOutside: () => { if (closeOnClickOutside) setShowModal(false); } });
  useLockBodyScroll(lockScrollWhenOpen);

  return (
    <div className={cn(styles.container, !fixedContainer && styles.absoluteContainer, fixedContainer && styles.fixedContainer, className)}>
      <div className={styles.subContainer} ref={modalReference}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        { addCloseButton && <div className={styles.closeButton} role='button' tabIndex={0} onKeyPress={() => setShowModal(false)} onClick={() => setShowModal(false)} /> }
        <div className={styles.contentContainer}>
          { title && (
            <div className={styles.title} ref={titleReference}>
              { Array(numberOfTitleLine).fill(0).map((n, lineNumber) => <ModalLine lineNumber={lineNumber} key={`modal-line-${lineNumber}`} />) }
              {title}
            </div>
          ) }
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
