import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import paginate from "../../utilities/array/paginate";

interface IUsePaginationResponse<T>
{
  paginatedItems : T[]
  hasPreviousPage : boolean
  hasNextPage : boolean
  offset : number
  page : number

  goToPreviousPage : () => void
  goToNextPage : () => void

  // eslint-disable-next-line no-unused-vars
  setPage : (page : number) => void
  // eslint-disable-next-line no-unused-vars
  setPageSize : (pageSize : number) => void
}

const usePagination = <T, >(items : T[], defaultPageSize = 1) : IUsePaginationResponse<T> => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [paginatedItems, setPaginatedItems] = useState<T[]>(items);

  const hasPreviousPage = useMemo(() => page > 1 && ((page - 1) * pageSize) > 0, [page, pageSize]);
  // eslint-disable-next-line
  const hasNextPage = useMemo(() => (page * pageSize) < items.length, [page, pageSize]);
  const offset = useMemo(() => (page - 1) * pageSize, [page, pageSize]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) setPage(page - 1);
  }, [page, hasPreviousPage]);
  const goToNextPage = useCallback(() => {
    if (hasNextPage) setPage(page + 1);
  }, [page, hasNextPage]);

  useEffect(() => {
    setPaginatedItems(paginate(items, page, pageSize));
    // eslint-disable-next-line
  }, [pageSize, page]);

  return {
    paginatedItems,
    offset,
    page,
    hasPreviousPage,
    hasNextPage,

    goToPreviousPage,
    goToNextPage,

    setPageSize,
    setPage,
  };
};

export default usePagination;
