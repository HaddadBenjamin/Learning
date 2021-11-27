import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import IPagination, { IPaginateResponse } from '../pagination.model';
import { ApplicationState } from '../../../../../samples/lazyRedux/root.state';

const usePaginateResponse = <T>(
  selectPaginateResponse: (state: ApplicationState) => IPaginateResponse<T>,
  pagination: IPagination<T>,
  setPagination: (pagination: IPagination<T>) => void
) => {
  const paginateResponse = useSelector(selectPaginateResponse);

  useEffect(
    () =>
      setPagination({
        ...pagination,
        lastPage: paginateResponse.lastPage,
        itemsCount: paginateResponse.itemsCount,
      }),
    [paginateResponse.lastPage, paginateResponse.itemsCount]
  );

  useEffect(
    () => setPagination({ ...pagination, items: paginateResponse.items }),
    [paginateResponse.items]
  );

  return paginateResponse;
};

export default usePaginateResponse;
