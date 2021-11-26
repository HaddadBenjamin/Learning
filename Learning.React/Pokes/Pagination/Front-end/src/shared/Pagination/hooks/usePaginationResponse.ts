import {ApplicationState} from "../../../domains/root/root.state";
import {IPaginateResponse, IPagination} from "../pagination.model";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const usePaginateResponse = <T>(
	selectPaginateResponse: (state: ApplicationState) => IPaginateResponse<T>,
	pagination: IPagination<T>,
	setPagination: (pagination: IPagination<T>) => void) => {
	const paginateResponse = useSelector(selectPaginateResponse)
	
	useEffect(() => setPagination({
		...pagination,
		lastPage: paginateResponse.lastPage,
		itemsCount: paginateResponse.itemsCount
	}), [paginateResponse.lastPage, paginateResponse.itemsCount])
	
	useEffect(() => setPagination({...pagination, items: paginateResponse.items}), [paginateResponse.items])
	
	return paginateResponse
}