import { call, put, select, takeLatest } from 'redux-saga/effects'

import {
	deleteMovieFailedAction,
	DeleteMovieRequestAction,
	deleteMovieSuccessAction, dislikeMovieFailedAction, dislikeMovieSuccessAction,
	getMoviesFailedAction, getMoviesRequestAction,
	getMoviesSuccessAction, likeMovieFailedAction, LikeMovieRequestAction, likeMovieSuccessAction, MovieAction
} from "./movies.action";
import {IMovie} from "./movies.model";
import {selectMovies} from "./movies.selector";
import {deleteMovie, getMovies, updateMovie} from "./movies.api";

export function* getMoviesSaga()
{
	try
	{
		const movies : IMovie[] = yield call(getMovies);
		
		yield put(getMoviesSuccessAction(movies));
	}
	catch (error : any)
	{
		yield put(getMoviesFailedAction(error.message));
	}
}

export function* deleteMovieSaga(action : DeleteMovieRequestAction)
{
	try
	{
		const { id } = action.payload
		
		yield call(deleteMovie, id);
		yield put(deleteMovieSuccessAction());
		yield put(getMoviesRequestAction());
	}
	catch (error : any)
	{
		yield put(deleteMovieFailedAction(error.message));
	}
}

export function* likeMovieSaga(action : LikeMovieRequestAction)
{
	try
	{
		const { id } = action.payload
		
		const movies : IMovie[] = yield select(selectMovies);
		const movie = movies.find(m => m.id === id)!
		
		yield call(updateMovie, { ...movie, likes : movie.likes + 1 });
		yield put(likeMovieSuccessAction());
		yield put(getMoviesRequestAction());
	}
	catch (error : any)
	{
		yield put(likeMovieFailedAction(error.message));
	}
}

export function* dislikeMovieSaga(action : LikeMovieRequestAction)
{
	try
	{
		const { id } = action.payload
		
		const movies : IMovie[] = yield select(selectMovies);
		const movie = movies.find(m => m.id === id)!
		
		yield call(updateMovie, { ...movie, dislikes : movie.dislikes + 1 });
		yield put(dislikeMovieSuccessAction());
		yield put(getMoviesRequestAction());
	}
	catch (error : any)
	{
		yield put(dislikeMovieFailedAction(error.message));
	}
}

export default function* moviesSaga() : Generator {
	yield takeLatest(MovieAction.GET_MOVIES_REQUEST, getMoviesSaga);
	yield takeLatest(MovieAction.DELETE_MOVIES_REQUEST, deleteMovieSaga);
	yield takeLatest(MovieAction.LIKE_MOVIES_REQUEST, likeMovieSaga);
	yield takeLatest(MovieAction.DISLIKE_MOVIES_REQUEST, dislikeMovieSaga);
}
