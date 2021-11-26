import {FC} from "react";
import styles from './PaginationInformation.module.scss';
import {IPagination} from "../../pagination.model";

const PaginationInformation: FC<IPagination<any>> = (
	{
		itemsCount,
		page,
		pageSize,
		hasPreviousPage,
		hasNextPage,
		lastPage,
		pageSizeInThisPage
	}) =>
	<div className={styles.container}>
		<div>items count : {itemsCount}</div>
		<div>page : {page}</div>
		<div>pageSize : {pageSize}</div>
		<div>hasPreviousPage : {hasPreviousPage.toString()}</div>
		<div>hasNextPage : {hasNextPage.toString()}</div>
		<div>lastPage : {lastPage}</div>
		<div>pageSizeInThisPage : {pageSizeInThisPage}</div>
	</div>

export default PaginationInformation