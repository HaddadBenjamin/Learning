import {useEffect, useState} from "react";
import {ApplicationState} from "../../../domains/root/root.state";
import {IPaginateResponse} from "../pagination.model";
import {useSelector} from "react-redux";

export interface Pagination<T> {
	items: T[],
	currentPage: T[],
	page: number,
	pageSize: number,
	pageSizeInThisPage: number,
	hasPreviousPage: boolean,
	hasNextPage: boolean,
	lastPage: number,
	itemsCount: number
}

export interface usePaginationResponse<T> {
	pagination: Pagination<T>
	setPagination: (pagination: Pagination<T>) => void
	goToPreviousPage: () => void
	goToNextPage: () => void
	goToPage: (page: number) => void
}
const usePagination = <T>(
	// Ces 3 champs sont nécéssaires quand on a besoin de faire des appels HTTP à chaque changement de page.
	onPageChange: (page: number, pageSize: number) => void,
	selectPaginateResponse: (state: ApplicationState) => IPaginateResponse<T>, // paginate response
	callHttpOnSelectPage : boolean = true,
	iPage: number = 1,
	iPageSize: number = 10) : usePaginationResponse<T> =>
{
	// paginate response
	const paginateResponse = useSelector(selectPaginateResponse)
	
	useEffect(() => setPagination({
		...pagination,
		lastPage : paginateResponse.lastPage,
		itemsCount : paginateResponse.itemsCount,
		items : paginateResponse.items
	}), [paginateResponse.lastPage, paginateResponse.itemsCount, paginateResponse.items])
	
	// pagination
	const [pagination, setPagination] = useState({
		items : [] as T[],
		currentPage : [] as T[],
		page : iPage,
		pageSize : iPageSize,
		pageSizeInThisPage : 1,
		hasPreviousPage : false,
		hasNextPage : false,
		lastPage : 1,
		itemsCount : iPageSize
	})
	
	useEffect(() => onPageChange(iPage, iPageSize), [])
	useEffect(() => onPageChange(pagination.page, pagination.pageSize), [pagination.page, pagination.pageSize])
	useEffect(() => computePagination(), [pagination.page, pagination.pageSize, pagination.items])
	
	const computePagination = (): void =>
	{
		// Simplifier cette merde
		const itemsCount = pagination.itemsCount ?? pagination.items.length
		const pageSize = pagination.pageSize > itemsCount ? itemsCount: pagination.pageSize
		const lastPage = pageSize === 0 ? 1 : Math.floor(itemsCount/ pageSize);
		const page = pagination.page > lastPage ? lastPage : pagination.page;
		
		setPagination({
			...pagination,
			pageSize : pageSize,
			page : page,
			lastPage : lastPage,
			currentPage: callHttpOnSelectPage ? pagination.items : pagination.items.slice(pageSize * (page - 1)).slice(0, pageSize),
			hasPreviousPage: page - 1 > 0,
			hasNextPage: page < lastPage,
			pageSizeInThisPage: callHttpOnSelectPage ? pageSize : page === lastPage ? itemsCount % pageSize : pageSize
		})
	}
	
	const goToPreviousPage = (): void => {
		if (pagination.hasPreviousPage) setPagination({...pagination, page : pagination.page - 1 });
	}
	const goToNextPage = (): void => {
		if (pagination.hasNextPage) setPagination({...pagination, page : pagination.page + 1 });
	}
	
	const goToPage = (page:  number) => {
		if (page >= 1 && page <= pagination.lastPage)
			setPagination({...pagination, page : page})
	}
	
	return { pagination, setPagination, goToPreviousPage, goToNextPage, goToPage } as const
}

export default usePagination