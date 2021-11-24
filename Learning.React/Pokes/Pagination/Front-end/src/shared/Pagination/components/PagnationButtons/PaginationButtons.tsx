import {FC} from "react";
import {Pagination} from "../../pagination.model";
import styles from './PaginationButtons.module.scss';

interface Props extends Pagination<any>
{
	setPagination : (pagination : Pagination<any>) => void
}

export const PaginationButtons : FC<Props> = (
{
	page,
	pageSize,
	lastPage,
	pageSizeInThisPage,
	
	hasPreviousPage,
	hasNextPage,
	
	getPreviousPage,
	getNextPage,
	
	setPagination,
	setPage
}) =>
<>
	<div>
		<div>page : {page}</div>
		<div>pageSize : {pageSize}</div>
		<div>hasPreviousPage : {hasPreviousPage.toString()}</div>
		<div>hasNextPage : {hasNextPage.toString()}</div>
		<div>lastPage : {lastPage}</div>
		<div>pageSizeInThisPage : {pageSizeInThisPage}</div>
	</div>

	<div>
		<button onClick={() => setPagination(setPage((0)))} className={page === 1 ? styles.active : ''}>First</button>
		<button disabled={!hasPreviousPage} onClick={() => setPagination(getPreviousPage())}>Previous</button>
		{ new Array(lastPage).fill(0).map((e, i) => i + 1).map(p =>
				<button onClick={() => setPagination(setPage(p))} className={p === page ? styles.active : ''}>
					{p}
				</button>)}
		<button disabled={!hasNextPage} onClick={() => setPagination(getNextPage())}>Next</button>
		<button onClick={() => setPagination(setPage((lastPage)))} className={page === lastPage ? styles.active : ''}>Last</button>
	</div>
</>
