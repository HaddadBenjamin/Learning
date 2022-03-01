import {
  MutableRefObject, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import useElementSize from '../styles/useElementSize';

// Voir le rendu dans mes notes
const useSlider = <T, >(items : T[], elementWidth : number) => {
  const containerRef = useRef() as MutableRefObject<HTMLElement>;
  const elementSize = useElementSize(containerRef);
  const [page, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<T[]>(items);
  const itemsPerPage = useMemo(() => Math.floor(elementSize.width / elementWidth), [elementSize]);
  const hasPreviousPage = useMemo(() => page > 1 && ((page - 1) * itemsPerPage) > 0, [page, itemsPerPage]);
  const hasNextPage = useMemo(() => (page * itemsPerPage) < items.length, [page, itemsPerPage]);
  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) setPage(page - 1);
  }, [page, hasPreviousPage]);
  const goToNextPage = useCallback(() => {
    if (hasNextPage) setPage(page + 1);
  }, [page, hasNextPage]);

  useEffect(() => {
    setPaginatedItems(items.slice((page - 1) * itemsPerPage).slice(0, itemsPerPage));
  }, [itemsPerPage, page]);

  return {
    containerRef,
    paginatedItems,
    goToPreviousPage,
    goToNextPage,
    hasPreviousPage,
    hasNextPage,
  };
};

export default useSlider;
