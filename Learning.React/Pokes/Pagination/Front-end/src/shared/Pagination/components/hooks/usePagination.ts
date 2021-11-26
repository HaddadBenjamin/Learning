import {useEffect, useState} from "react";

export interface Pagination<T> {
	items: T[]
	currentPage: T[]
	
	page: number,
	pageSize: number,
	pageSizeInThisPage: number,
	
	hasPreviousPage: boolean
	hasNextPage: boolean
	lastPage: number
	
	setPage: (page: number) => void
	setPageSize: (pageSize: number) => void
	setItems: (items: T[]) => void
	
	goToPreviousPage: () => void
	goToNextPage: () => void
	
	// Ces 2 champs sont nécéssaires quand on a besoin de faire des appels HTTP à chaque changement de page.
	setLastPage: (lastPage: number) => void
	setItemsCount: (itemsCount: number) => void
	
	itemsCount: number
}

const usePagination = <T>(
	iItems: T[],
	onPageChange: (page: number, pageSize: number) => void,
	iPage: number = 1,
	iPageSize: number = 10): Pagination<T> => {
	const [items, setItems] = useState(iItems)
	const [currentPage, setCurrentPage] = useState(iItems)
	
	const [page, setPage] = useState(iPage)
	const [pageSize, setPageSize] = useState(iPageSize)
	const [pageSizeInThisPage, setPageSizeInThisPage] = useState(1)
	
	const [hasPreviousPage, setHasPreviousPage] = useState(false)
	const [hasNextPage, setHasNextPage] = useState(false)
	const [lastPage, setLastPage] = useState(1)
	
	const [itemsCount, setItemsCount] = useState<number | undefined>()
	
	useEffect(() => {
		computePagination();
		onPageChange(page, pageSize);
	}, [])
	useEffect(() => computePagination(), [page, pageSize, items])
	
	const computePagination = (): void => {
		const cPageSize = pageSize > items.length ? items.length : pageSize
		const cLastPage = cPageSize === 0 ? 1 : Math.floor(items.length / cPageSize) + 1;
		const cPage = page > cLastPage ? cLastPage : page;
		
		setLastPage(cLastPage)
		
		if (cPageSize !== pageSize) {
			setPageSize(cPageSize)
			onPageChange(page, pageSize)
		}
		if (page !== cPage) {
			setPage(cPage)
			onPageChange(page, pageSize)
		}
		
		setCurrentPage(items.slice(cPageSize * (cPage - 1)).slice(0, cPageSize))
		setHasPreviousPage(cPage - 1 > 0)
		setHasNextPage(cPage < cLastPage)
		setPageSizeInThisPage(cPage === cLastPage ? items.length % cPageSize : cPageSize)
	}
	
	const goToPreviousPage = (): void => {
		if (hasPreviousPage) setPage(page - 1);
	}
	const goToNextPage = (): void => {
		if (hasNextPage) setPage(page + 1);
	}
	
	return {
		items,
		currentPage,
		
		page,
		pageSize,
		pageSizeInThisPage,
		
		hasPreviousPage,
		hasNextPage,
		lastPage,
		
		setPage,
		setPageSize,
		setItems,
		
		goToPreviousPage,
		goToNextPage,
		
		// Ces 2 champs sont nécéssaires quand on a besoin de faire des appels HTTP à chaque changement de page.
		setLastPage,
		setItemsCount,
		
		itemsCount: itemsCount ?? items.length
	}
}

export default usePagination