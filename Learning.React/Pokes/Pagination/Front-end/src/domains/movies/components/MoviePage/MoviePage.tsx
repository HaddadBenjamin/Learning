import {ChangeEvent, FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesRequestAction} from "../../movies.action";
import {selectMovies} from "../../movies.selector";
import {MovieFilters} from "../MovieFilters/MovieFilters";
import {filterMovies} from "../../movies.filter";
import {MoviesList} from "../MoviesList/MoviesList";
import {Pagination} from "../../../../shared/Pagination/pagination.model";
import {PaginationButtons} from "../../../../shared/Pagination/components/PagnationButtons/PaginationButtons";

export const MoviePage : FC = () =>
{
	const dispatch = useDispatch()
	const movies = useSelector(selectMovies)
	
	useEffect(() => { dispatch(getMoviesRequestAction())}, [])
	
	// Filters
	const [filteredMovies, setFilteredMovies] = useState(movies)
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
	const uniqueCategories = movies
		.map(m => m.category)
		.filter((element, index, self) => self.indexOf(element) === index);
	
	useEffect(() => { setFilteredMovies(filterMovies(movies, selectedCategory))}, [selectedCategory, movies])
	
	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) =>
		setSelectedCategory(event.target.value === '' ? undefined : event.target.value)
	const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) =>
		setPageSize(Number(event.target.value))
	
	// Pagination
	const [pageSize, setPageSize] = useState(8)
	const [pagination, setPagination] = useState(new Pagination(filteredMovies, 1, pageSize))
	
	useEffect(() => { setPagination(new Pagination(filteredMovies ?? movies, pagination.page, pageSize))},
		[filteredMovies, pageSize])
	
	return <>
		<h1>Movie page</h1>
		<MovieFilters
			categories={uniqueCategories}
			selectedCategory={selectedCategory}
			handleCategoryChange={handleCategoryChange}
			pageSize={pageSize}
			handlePageSizeChange={handlePageSizeChange}/>
		<MoviesList movies={pagination.currentPage}/>
		<PaginationButtons {...pagination } setPagination={setPagination} />
	</>
}

