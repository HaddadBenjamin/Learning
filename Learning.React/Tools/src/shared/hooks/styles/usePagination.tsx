import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import paginate from "../../utilities/array/paginate";

interface IUsePaginationParameters<T>
{
  defaultItems : T[],
  defaultPageSize? : number
  defaultMoveSize?: number
  shouldComputePageOnPageSizeChange? : boolean
}

interface IUsePaginationResponse<T>
{
  paginatedItems : T[]

  hasPreviousPage : boolean
  hasNextPage : boolean

  page : number
  pageSize : number,
  moveSize : number, // permet d'utiliser la pagination comme un slider, exemple : on bouge de 1 en 1 au lieu de pageSize
  offset : number

  goToPreviousPage : () => void
  goToNextPage : () => void

  // eslint-disable-next-line no-unused-vars
  setPage : (page : number) => void
  // eslint-disable-next-line no-unused-vars
  setPageSize : (pageSize : number) => void
  // eslint-disable-next-line no-unused-vars
  setMoveSize : (moveSize : number) => void
  // eslint-disable-next-line no-unused-vars
  setItems : (items : T[]) => void
}

export const computePageOnPageSizeChange = (pageSize : number, page: number, newPageSize : number) : number => {
  const itemsCount = pageSize * page;
  const newPage = Math.floor(itemsCount / newPageSize);

  return newPage;
};

const usePagination = <T, >({
                              defaultItems,
                              defaultPageSize = 1,
                              defaultMoveSize,
                              shouldComputePageOnPageSizeChange,
                            } : IUsePaginationParameters<T>) : IUsePaginationResponse<T> => {
  const [items, setItems] = useState<T[]>(defaultItems);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [paginatedItems, setPaginatedItems] = useState<T[]>(items);
  const [moveSize, setMoveSize] = useState(defaultMoveSize ?? defaultPageSize);

  const hasPreviousPage = useMemo(() => page > 1, [page]);
  // eslint-disable-next-line
  const hasNextPage = useMemo(() => ((page - 1) * moveSize) + pageSize < items.length, [page, moveSize, pageSize]);
  const offset = useMemo(() => (page === 1 ? 0 : (page - 1) * moveSize), [page, moveSize]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) setPage(page - 1);
  }, [page, hasPreviousPage]);
  const goToNextPage = useCallback(() => {
    if (hasNextPage) setPage(page + 1);
  }, [page, hasNextPage]);

  useEffect(() => {
    setPaginatedItems(paginate(items, page, pageSize, moveSize));
  }, [pageSize, page, moveSize, items]);

  const setPageSizeAndComputePageOnPageSizeChange = useCallback((newPageSize : number) => {
    if (shouldComputePageOnPageSizeChange) setPage(computePageOnPageSizeChange(pageSize, page, newPageSize));

    setPageSize(newPageSize);
  }, [pageSize, page, shouldComputePageOnPageSizeChange]);

  return {
    paginatedItems,

    hasPreviousPage,
    hasNextPage,

    page,
    pageSize,
    moveSize,
    offset,

    goToPreviousPage,
    goToNextPage,

    setPageSize: setPageSizeAndComputePageOnPageSizeChange,
    setPage,
    setMoveSize,
    setItems,
  };
};

export default usePagination;