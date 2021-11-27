import React, { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import selectPaginateResponse from '../../ids.selector';
import PaginationFilters from '../../../../shared/domains/lazyLoad/pagination/components/PaginationFilters/PaginationFilters';
import IdsList from '../IdList/IdsList';
import PaginationButtons from '../../../../shared/domains/lazyLoad/pagination/components/PagnationButtons/PaginationButtons';
import usePagination from '../../../../shared/domains/lazyLoad/pagination/hooks/usePagination';
import { getPaginateIdsRequestAction } from '../../ids.action';
import PaginationInformation from '../../../../shared/domains/lazyLoad/pagination/components/PaginationInformation/PaginationInformation';

const LazyPaginationSample: FC = () => {
  const dispatch = useDispatch();
  const {
    pagination,
    setPagination,
    goToPreviousPage,
    goToPage,
    goToNextPage,
  } = usePagination<number>(
    (page, pageSize) => dispatch(getPaginateIdsRequestAction(page, pageSize)),
    selectPaginateResponse,
    true,
    1,
    10
  );

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setPagination({ ...pagination, pageSize: Number(event.target.value) });

  return (
    <>
      <h1>Lazy pagination</h1>
      <div>
        To test: F12 &gt; Network &gt; XHR &gt; notice the new HTTP call when
        the page or the page size is modified
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

export default LazyPaginationSample;
