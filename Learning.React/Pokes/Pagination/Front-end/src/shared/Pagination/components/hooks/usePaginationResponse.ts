import {ApplicationState} from "../../../../domains/root/root.state";
import {IPaginateResponse} from "../../pagination.model";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {Pagination} from "./usePagination";

export const usePaginateResponse = <T>(
	selectPaginateResponse: (state: ApplicationState) => IPaginateResponse<T>,
	pagination : Pagination<T>,
	setPagination : (pagination : Pagination<T>) => void) =>
{
	const paginateResponse = useSelector(selectPaginateResponse)
	
	useEffect(() => setPagination({
		...pagination,
		lastPage : paginateResponse.lastPage,
		itemsCount : paginateResponse.itemsCount
	}), [paginateResponse.lastPage, paginateResponse.itemsCount])
	
	useEffect(() => setPagination({ ...pagination, items : paginateResponse.items }), [paginateResponse.items])
	
	return paginateResponse
}