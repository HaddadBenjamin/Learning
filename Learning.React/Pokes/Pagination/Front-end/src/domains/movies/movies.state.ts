import { IMovie } from "./movies.model";

export interface IMovieState
{
	movies : IMovie[]
	error? : string
}

export const moviesInitialState : IMovieState =
{
	movies : []
}