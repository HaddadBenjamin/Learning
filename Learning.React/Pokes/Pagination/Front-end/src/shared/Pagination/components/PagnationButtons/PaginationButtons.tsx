import {FC} from "react";
import styles from './PaginationButtons.module.scss';
import {IPagination} from "../../pagination.model";

interface Props<T> {
	showFirstAndLastButtons?: boolean
	showPrevAndNextButtons?: boolean
	showPageButtons?: boolean
	
	pagination: IPagination<T>
	goToPreviousPage: () => void
	goToNextPage : () => void
	goToPage : (page : number) => void
}

export const PaginationButtons : FC<Props<any>> = (
	{
		showFirstAndLastButtons,
		showPrevAndNextButtons,
		showPageButtons,
		
		pagination,
		
		goToPreviousPage,
		goToPage,
		goToNextPage
	}) =>
{
	const {page, hasPreviousPage, hasNextPage, lastPage} = pagination
	
	return <>
		<div>
			{[undefined, true].includes(showFirstAndLastButtons) &&
      <button onClick={() => goToPage((0))} className={page === 1 ? styles.active : ''}>First</button>}
			
			{[undefined, true].includes(showPrevAndNextButtons) &&
      <button disabled={!hasPreviousPage} onClick={() => goToPreviousPage()}>Previous</button>}
			
			{[undefined, true].includes(showPageButtons) &&
			new Array(lastPage).fill(0).map((e, i) => i + 1).map(p =>
				<button key={`PaginationButton-${p}`} onClick={() => goToPage(p)} className={p === page ? styles.active : ''}>
					{p}
				</button>)
			}
			
			{[undefined, true].includes(showPrevAndNextButtons) &&
      <button disabled={!hasNextPage} onClick={() => goToNextPage()}>Next</button>}
			
			{[undefined, true].includes(showFirstAndLastButtons) &&
      <button onClick={() => goToPage((lastPage))} className={page === lastPage ? styles.active : ''}>Last</button>}
		</div>
	</>
}