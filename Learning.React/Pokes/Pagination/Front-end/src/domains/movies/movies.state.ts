import { IMovie } from "./movies.model";

export interface IMovieState
{
	items: IMovie[]
	lastPage: number
	itemsCount: number
	error?: string
}

export const moviesInitialState: IMovieState =
	{
		items: [],
		lastPage: 1,
		itemsCount: 0
	}