import {ChangeEvent, FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPaginateMoviesRequestAction} from "../../movies.action";
import {selectPaginateResponse} from "../../movies.selector";
import {MovieFilters} from "../MovieFilters/MovieFilters";
import {filterMovies} from "../../movies.filter";
import {MoviesList} from "../MoviesList/MoviesList";
import {PaginationButtons} from "../../../../shared/Pagination/components/PagnationButtons/PaginationButtons";
import usePagination from "../../../../shared/Pagination/components/hooks/usePagination";
import {IMovie} from "../../movies.model";
import {usePaginateResponse} from "../../../../shared/Pagination/components/hooks/usePaginationResponse";

export const MoviePage: FC = () => {
	// Pagination
	const dispatch = useDispatch()
	const pagination = usePagination<IMovie>(
		[],
		(page, pageSize) => dispatch(getPaginateMoviesRequestAction(page, pageSize)))
	const paginateResponse = usePaginateResponse(selectPaginateResponse, pagination)
	
	// Filters
	const [filteredItems, setFilteredItems] = useState(paginateResponse.items)
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
	
	useEffect(() => setFilteredItems(filterMovies(paginateResponse.items, selectedCategory)), [selectedCategory, paginateResponse.items])
	useEffect(() => pagination.setItems(filteredItems), [filteredItems])
	
	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) =>
		setSelectedCategory(event.target.value === '' ? undefined : event.target.value)
	const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) =>
		pagination.setPageSize(Number(event.target.value))
	
	const uniqueCategories = paginateResponse.items
		.map(m => m.category)
		.filter((element, index, self) => self.indexOf(element) === index);
	
	return <>
		<h1>Movie page</h1>
		<MovieFilters
			categories={uniqueCategories}
			selectedCategory={selectedCategory}
			handleCategoryChange={handleCategoryChange}
			pageSize={pagination.pageSize}
			handlePageSizeChange={handlePageSizeChange}/>
		<MoviesList movies={pagination.currentPage}/>
		<PaginationButtons {...pagination} />
	</>
}

