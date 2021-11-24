import {IMovieState, moviesInitialState} from "../movies/movies.state";

export interface ApplicationState
{
	movies : IMovieState
}

export const initialApplicationState : ApplicationState =
{
	movies : moviesInitialState
}