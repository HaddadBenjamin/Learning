import {useEffect, useState} from "react";

const usePagination = <T>(iElements: T[], iPage: number = 1, iPageSize: number = 10) => {
	const [elements, setElements] = useState(iElements)
	const [currentPage, setCurrentPage] = useState(iElements)
	
	const [page, setPage] = useState(iPage)
	const [pageSize, setPageSize] = useState(iPageSize)
	const [pageSizeInThisPage, setPageSizeInThisPage] = useState(1)
	
	const [hasPreviousPage, setHasPreviousPage] = useState(false)
	const [hasNextPage, setHasNextPage] = useState(false)
	const [lastPage, setLastPage] = useState(1)
	
	useEffect(() => computePagination(), [])
	useEffect(() => computePagination(), [page, pageSize, elements])
	
	const computePagination = (): void => {
		const cPageSize = pageSize > elements.length ? elements.length : pageSize
		const cLastPage = cPageSize === 0 ? 1 : Math.floor(elements.length / cPageSize) + 1;
		const cPage = page > cLastPage ? cLastPage : page;
		
		setLastPage(cLastPage)
		
		if (cPageSize !== pageSize)
			setPageSize(cPageSize)
		
		if (page !== cPage)
			setPage(cPage)
		
		setCurrentPage(elements.slice(cPageSize * (cPage - 1)).slice(0, cPageSize))
		setHasPreviousPage(cPage - 1 > 0)
		setHasNextPage((cPageSize * cPage) < elements.length)
		setPageSizeInThisPage(cPage === lastPage ? elements.length % cPageSize : cPageSize)
	}
	
	const goToPreviousPage = (): void => {
		if (hasPreviousPage) setPage(page - 1);
	}
	const goToNextPage = (): void => {
		if (hasNextPage) setPage(page + 1);
	}
	
	return {
		elements,
		currentPage,
		
		page,
		pageSize,
		pageSizeInThisPage,
		
		hasPreviousPage,
		hasNextPage,
		lastPage,
		
		setPage,
		setPageSize,
		setElements,
		
		goToPreviousPage,
		goToNextPage
	}
}

export default usePagination