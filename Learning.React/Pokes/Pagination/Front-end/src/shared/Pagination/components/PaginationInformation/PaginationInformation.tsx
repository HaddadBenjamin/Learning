import {Pagination} from "../../hooks/usePagination";
import {FC} from "react";
import styles from './PaginationInformation.module.scss';

interface Props<T> {
	pagination: Pagination<T>
}

const PaginationInformation: FC<Props<any>> = ({pagination}) => {
	const {itemsCount, page, pageSize, hasPreviousPage, hasNextPage, lastPage, pageSizeInThisPage,} = pagination
	
	return <div className={styles.container}>
		<div>items count : {itemsCount}</div>
		<div>page : {page}</div>
		<div>pageSize : {pageSize}</div>
		<div>hasPreviousPage : {hasPreviousPage.toString()}</div>
		<div>hasNextPage : {hasNextPage.toString()}</div>
		<div>lastPage : {lastPage}</div>
		<div>pageSizeInThisPage : {pageSizeInThisPage}</div>
	</div>
}

export default PaginationInformation