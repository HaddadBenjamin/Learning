import {ChangeEvent, FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesRequestAction} from "../../movies.action";
import {selectMovies} from "../../movies.selector";
import {MovieFilters} from "../MovieFilters/MovieFilters";
import {filterMovies} from "../../movies.filter";
import {MoviesList} from "../MoviesList/MoviesList";
import {PaginationButtons} from "../../../../shared/Pagination/components/PagnationButtons/PaginationButtons";
import usePagination from "../../../../shared/Pagination/components/hooks/usePagination";

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
	const pagination = usePagination(filteredMovies, 1, pageSize)
	
	useEffect(() => {
		pagination.setElements(filteredMovies.length === 0 ? movies : filteredMovies)
	}, [filteredMovies])
	useEffect(() => {
		pagination.setPageSize(pageSize)
	}, [pageSize])
	
	return <>
		<h1>Movie page</h1>
		<MovieFilters
			categories={uniqueCategories}
			selectedCategory={selectedCategory}
			handleCategoryChange={handleCategoryChange}
			pageSize={pageSize}
			handlePageSizeChange={handlePageSizeChange}/>
		<MoviesList movies={pagination.currentPage}/>
		<PaginationButtons {...pagination} />
	</>
}

