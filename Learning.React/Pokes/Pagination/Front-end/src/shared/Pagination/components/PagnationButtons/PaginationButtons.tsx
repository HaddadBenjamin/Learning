import {FC} from "react";
import styles from './PaginationButtons.module.scss';

interface Props {
	showInformation?: boolean
	showFirstAndLastButtons?: boolean
	showPrevAndNextButtons?: boolean
	showPageButtons?: boolean
	
	page: number
	pageSize: number
	lastPage: number
	pageSizeInThisPage: number
	
	hasPreviousPage: boolean
	hasNextPage: boolean
	
	goToPreviousPage: () => void
	goToNextPage: () => void
	
	setPage: (page: number) => void
}

export const PaginationButtons : FC<Props> = (
	{
		showInformation,
		showFirstAndLastButtons,
		showPrevAndNextButtons,
		showPageButtons,
		
		page,
		pageSize,
		lastPage,
		pageSizeInThisPage,
		
		hasPreviousPage,
		hasNextPage,
		
		goToPreviousPage,
		goToNextPage,
		
		setPage
	}) =>
	<>
		{[undefined, true].includes(showInformation) &&
    <div>
        <div>page : {page}</div>
        <div>pageSize : {pageSize}</div>
        <div>hasPreviousPage : {hasPreviousPage.toString()}</div>
        <div>hasNextPage : {hasNextPage.toString()}</div>
        <div>lastPage : {lastPage}</div>
        <div>pageSizeInThisPage : {pageSizeInThisPage}</div>
    </div>}
		
		<div>
			{[undefined, true].includes(showFirstAndLastButtons) &&
      <button onClick={() => setPage((0))} className={page === 1 ? styles.active : ''}>First</button>}
			
			{[undefined, true].includes(showPrevAndNextButtons) &&
      <button disabled={!hasPreviousPage} onClick={() => goToPreviousPage()}>Previous</button>}
			
			{[undefined, true].includes(showPageButtons) &&
			new Array(lastPage).fill(0).map((e, i) => i + 1).map(p =>
				<button key={`PaginationButton-${p}`} onClick={() => setPage(p)} className={p === page ? styles.active : ''}>
					{p}
				</button>)
			}
			
			{[undefined, true].includes(showPrevAndNextButtons) &&
      <button disabled={!hasNextPage} onClick={() => goToNextPage()}>Next</button>}
			
			{[undefined, true].includes(showFirstAndLastButtons) &&
      <button onClick={() => setPage((lastPage))} className={page === lastPage ? styles.active : ''}>Last</button>}
		</div>
	</>