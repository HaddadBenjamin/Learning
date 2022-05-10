import React, {
  FC, MutableRefObject, useEffect, useRef,
} from 'react';
import cn from 'classnames';
import styles from './Modal.module.scss';
import useOnClickOutside from "../../hooks/styles/useOnClickOutside";
import useLockBodyScroll from "../../hooks/utilities/useLockBodyScroll";
import useElementSize from "../../hooks/styles/useElementSize";

interface ModalLineProps {
  lineNumber: number
}

const MODAL_LINE_HEIGHT = 38;
const ModalLine : FC<ModalLineProps> = ({ lineNumber }) => {
  const reference = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    reference.current.style.bottom = `${3 + (lineNumber * MODAL_LINE_HEIGHT)}px`;
  }, []);

  return <div className={styles.titleLine} ref={reference} />;
};

interface Props {
  title : string,
  setShowModal: (showModal : boolean) => void,
  className?: string,
  lockScrollWhenOpen?: boolean,
  closeOnClickOutside?: boolean,
}

const Modal : FC<Props> = ({
  children,
  setShowModal,
  className,
  title,
  lockScrollWhenOpen = true,
  closeOnClickOutside = true,
}) => {
  const modalReference = useRef() as MutableRefObject<HTMLDivElement>;
  const { elementReference: titleReference, elementSize: { height: titleHeight } } = useElementSize<HTMLDivElement>();
  const numberOfTitleLine = titleHeight / MODAL_LINE_HEIGHT;

  useOnClickOutside(modalReference, () => { if (closeOnClickOutside) setShowModal(false); });
  useLockBodyScroll(lockScrollWhenOpen);

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.subContainer} ref={modalReference}>
        <div className={styles.closeButton} onClick={() => setShowModal(false)}>X</div>
        <div className={styles.contentContainer}>
          <div className={styles.title} ref={titleReference}>
            { Array(numberOfTitleLine).fill(0).map((n, lineNumber) => <ModalLine lineNumber={lineNumber} key={`modal-line-${lineNumber}`} />) }
            {title}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal
