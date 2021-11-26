import {ApplicationState} from "../../../../domains/root/root.state";
import {IPaginateResponse} from "../../pagination.model";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {Pagination} from "./usePagination";

export const usePaginateResponse = <T>(
	selectPaginateResponse: (state: ApplicationState) => IPaginateResponse<T>,
	pagination: Pagination<T>) => {
	const paginateResponse = useSelector(selectPaginateResponse)
	
	useEffect(() => {
			pagination.setLastPage(paginateResponse.lastPage)
			pagination.setItemsCount(paginateResponse.itemsCount)
		},
		[paginateResponse.lastPage, paginateResponse.itemsCount])
	
	return paginateResponse
}