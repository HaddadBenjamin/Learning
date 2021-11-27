import React, { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import usePagination from '../../../../shared/domains/lazyLoad/pagination/hooks/usePagination';
import PaginationFilters from '../../../../shared/domains/lazyLoad/pagination/components/PaginationFilters/PaginationFilters';
import IdsList from '../IdList/IdsList';
import PaginationInformation from '../../../../shared/domains/lazyLoad/pagination/components/PaginationInformation/PaginationInformation';
import PaginationButtons from '../../../../shared/domains/lazyLoad/pagination/components/PagnationButtons/PaginationButtons';
import selectPaginateResponse from '../../ids.selector';
import { getIdsRequestAction } from '../../ids.action';

const SimplePaginationSample: FC = () => {
  const dispatch = useDispatch();
  const {
    pagination,
    setPagination,
    goToPreviousPage,
    goToPage,
    goToNextPage,
  } = usePagination<number>(false, 1, 10, selectPaginateResponse, () =>
    dispatch(getIdsRequestAction())
  );

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setPagination({ ...pagination, pageSize: Number(event.target.value) });

  return (
    <>
      <h1>Simple pagination</h1>
      <div>
        Notice that none new HTTP call is done when the page or the page size is
        modified
      </div>
      <PaginationFilters
        pageSize={pagination.pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
      <IdsList ids={pagination.currentPage} />
      <PaginationInformation {...pagination} />
      <PaginationButtons
        pagination={pagination}
        goToPreviousPage={goToPreviousPage}
        goToPage={goToPage}
        goToNextPage={goToNextPage}
      />
    </>
  );
};

export default SimplePaginationSample;
