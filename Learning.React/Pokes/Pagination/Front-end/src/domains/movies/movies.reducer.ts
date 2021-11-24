import { IMovieState, moviesInitialState } from './movies.state';
import { MovieAction, MovieActions } from './movies.action';

const movieReducer = (state: IMovieState = moviesInitialState, action: MovieActions) : IMovieState =>
{
	switch (action.type)
	{
		case MovieAction.GET_MOVIES_REQUEST :     return { ...state, error : undefined }
		case MovieAction.GET_MOVIES_SUCCESS :     return { ...state, movies: action.payload }
		case MovieAction.GET_MOVIES_FAILED :      return { ...state, error : action.error }

		default : return state
	}
}

export default movieReducer