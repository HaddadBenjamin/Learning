import React, {
  FC, MutableRefObject, useRef, Suspense,
} from 'react';
import useOnVisibleOnce from '../../../../hooks/styles/useOnVisibleOnce';

interface Props {
  className?: string
}

// Rend les composants enfants lorsque ce wrapper est visible
const LazyComponent : FC<Props> = ({ children, className }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const isVisible = useOnVisibleOnce({ ref });

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={<div>Chargement...</div>}>
        { isVisible && children }
      </Suspense>
    </div>
  );
};

export default LazyComponent;
