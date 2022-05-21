/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/restrict-plus-operands,react/button-has-type */
import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';
import clamp from '../../utilities/number/clamp';

interface Props
{
  pageSize: number,
  paginationType? : 'client side' | 'back side',

  // Props nécéssaires pour une pagination côté client
  items? : any[],
  onPaginatedItemsChange? : (paginatedItems : any[]) => void,

  // Props nécéssaires pour une pagination côté serveur
  count?: number,
  onPageChange? : (page : number) => void,
}

const Pagination : FC<Props> = ({
  pageSize = 5,
  paginationType = 'client side',

  items = new Array(100).fill(0).map((e, i) => i + 1),
  onPaginatedItemsChange = () => {}, // nécéssaire pour récupérer et utiliser les éléments paginées

  count = 5,
  onPageChange = () => {},
}) => {
  if (paginationType === 'client side' && (!items || !onPaginatedItemsChange)) throw new Error('Pagination client side props are not defined');
  else if (paginationType === 'back side' && (!count || !onPageChange)) throw new Error('Pagination back side props are not defined');

  const [page, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState(items);

  useEffect(() => { setPaginatedItems(items?.slice((page - 1) * pageSize, pageSize * page)); }, [page, pageSize]);
  useEffect(() => { onPaginatedItemsChange(paginatedItems); }, [paginatedItems]);
  useEffect(() => { onPageChange(page); }, [page]);

  // compute page button range
  let firstPageShowed = page - 1;
  let lastPageShowed = firstPageShowed + 6;
  const lastPage = Math.ceil(items.length / pageSize);
  firstPageShowed = clamp(firstPageShowed, 1, lastPage);
  lastPageShowed = clamp(lastPageShowed, 1, lastPage);

  return (
    <div className={styles.container}>
      <button onClick={() => setPage(page > 1 ? page - 1 : page)}>{'<'}</button>
      { new Array(clamp(lastPageShowed - firstPageShowed + 1, 1, 6)).fill(firstPageShowed).map((p, pageIndex) => <div className={cn(styles.page, page === p + pageIndex && styles.currentPage)} key={`page-button-${p + pageIndex}`} onClick={() => setPage(p + pageIndex)}>{p + pageIndex}</div>) }
      <button onClick={() => setPage(page < lastPage ? page + 1 : page)}>{'>'}</button>
    </div>
  );
};

export default Pagination;
