/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/restrict-plus-operands,react/button-has-type */
import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';
import clamp from '../../utilities/number/clamp';

interface Props
{
  pageSize: number,
  paginationButtonsCount?: number,

  // Props nécéssaires pour gérer une pagination côté client
  items? : any[],
  onPaginatedItemsChange? : (paginatedItems : any[]) => void,

  // Props nécéssaires pour gérer une pagination côté serveur
  count?: number,
  onPageChange? : (page : number) => void,
}

const Pagination : FC<Props> = ({
  pageSize = 5,
  paginationButtonsCount = 6,

  items,
  onPaginatedItemsChange = () => {},

  count = 5,
  onPageChange = () => {},
}) => {
  const [page, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState(items);

  useEffect(() => { setPaginatedItems(items?.slice((page - 1) * pageSize, pageSize * page)); }, [page, pageSize]);
  useEffect(() => { onPaginatedItemsChange(paginatedItems!); }, [paginatedItems]);
  useEffect(() => { onPageChange(page); }, [page]);

  // compute page button range
  let minimumPageRange = Math.ceil(page - (paginationButtonsCount / 2));
  let maximumPageRange = minimumPageRange + paginationButtonsCount;
  const lastPage = Math.ceil(items?.length ?? count / pageSize);
  minimumPageRange = clamp(minimumPageRange, 1, lastPage);
  maximumPageRange = clamp(maximumPageRange, 1, lastPage);
  const pageRangeLength = maximumPageRange - minimumPageRange + 1;
  maximumPageRange = pageRangeLength < paginationButtonsCount ? lastPage : maximumPageRange;

  return (
    <div className={styles.container}>
      <button onClick={() => setPage(page > 1 ? page - 1 : page)}>{'<'}</button>
      { new Array(clamp(maximumPageRange - minimumPageRange + 1, 1, paginationButtonsCount)).fill(minimumPageRange).map((p, pageIndex) => <div className={cn(styles.page, page === p + pageIndex && styles.currentPage)} key={`page-button-${p + pageIndex}`} onClick={() => setPage(p + pageIndex)}>{p + pageIndex}</div>) }
      <button onClick={() => setPage(page < lastPage ? page + 1 : page)}>{'>'}</button>
    </div>
  );
};

export default Pagination;
