// DELETE, like, dislike

import {IMovie} from './movies.model';
import {IPaginateResponse} from "../../shared/Pagination/pagination.model";

export enum MovieAction {
	GET_MOVIES_REQUEST = "movies/GET_MOVIES_REQUEST",
	GET_MOVIES_SUCCESS = "movies/GET_MOVIES_SUCCESS",
	GET_MOVIES_FAILED = "movies/GET_MOVIES_FAILED",
	
	GET_PAGINATE_MOVIES_REQUEST = "movies/GET_PAGINATE_MOVIES_REQUEST",
	GET_PAGINATE_MOVIES_SUCCESS = "movies/GET_PAGINATE_MOVIES_SUCCESS",
	GET_PAGINATE_MOVIES_FAILED = "movies/GET_PAGINATE_MOVIES_FAILED",
	
	DELETE_MOVIES_REQUEST = "movies/DELETE_MOVIES_REQUEST",
	DELETE_MOVIES_SUCCESS = "movies/DELETE_MOVIES_SUCCESS",
	DELETE_MOVIES_FAILED = "movies/DELETE_MOVIES_FAILED",
	
	LIKE_MOVIES_REQUEST = "movies/LIKE_MOVIES_REQUEST",
	LIKE_MOVIES_SUCCESS = "movies/LIKE_MOVIES_SUCCESS",
	LIKE_MOVIES_FAILED = "movies/LIKE_MOVIES_FAILED",
	
	DISLIKE_MOVIES_REQUEST = "movies/DISLIKE_MOVIES_REQUEST",
	DISLIKE_MOVIES_SUCCESS = "movies/DISLIKE_MOVIES_SUCCESS",
	DISLIKE_MOVIES_FAILED = "movies/DISLIKE_MOVIES_FAILED",
}

export interface GetMoviesRequestAction
{
	type: MovieAction.GET_MOVIES_REQUEST
}

export interface GetMoviesSuccessAction {
	type: MovieAction.GET_MOVIES_SUCCESS
	payload: IMovie[]
}

export interface GetMoviesFailedAction {
	type: MovieAction.GET_MOVIES_FAILED
	error: string
}

export interface GetPaginateMoviesRequestAction {
	type: MovieAction.GET_PAGINATE_MOVIES_REQUEST
	payload: { page: number, pageSize: number }
}

export interface GetPaginateMoviesSuccessAction {
	type: MovieAction.GET_PAGINATE_MOVIES_SUCCESS
	payload: IPaginateResponse<IMovie>
}

export interface GetPaginateMoviesFailedAction {
	type: MovieAction.GET_PAGINATE_MOVIES_FAILED
	error: string
}

export interface DeleteMovieRequestAction {
	type: MovieAction.DELETE_MOVIES_REQUEST
	payload: { id: string }
}

export interface DeleteMovieSuccessAction {
	type: MovieAction.DELETE_MOVIES_SUCCESS
}

export interface DeleteMovieFailedAction {
	type: MovieAction.DELETE_MOVIES_FAILED
	error: string
}

export interface LikeMovieRequestAction
{
	type : MovieAction.LIKE_MOVIES_REQUEST
	payload : { id : string }
}

export interface LikeMovieSuccessAction
{
	type : MovieAction.LIKE_MOVIES_SUCCESS
}

export interface LikeMovieFailedAction
{
	type : MovieAction.LIKE_MOVIES_FAILED
	error : string
}

export interface DislikeMovieRequestAction
{
	type : MovieAction.DISLIKE_MOVIES_REQUEST
	payload : { id : string }
}

export interface DislikeMovieSuccessAction
{
	type : MovieAction.DISLIKE_MOVIES_SUCCESS
}

export interface DislikeMovieFailedAction
{
	type : MovieAction.DISLIKE_MOVIES_FAILED
	error : string
}

export const getMoviesRequestAction = () : GetMoviesRequestAction => ({
	type : MovieAction.GET_MOVIES_REQUEST
})

export const getMoviesSuccessAction = (payload: IMovie[]): GetMoviesSuccessAction => ({
	type: MovieAction.GET_MOVIES_SUCCESS,
	payload
})

export const getMoviesFailedAction = (error: string): GetMoviesFailedAction => ({
	type: MovieAction.GET_MOVIES_FAILED,
	error
})

export const getPaginateMoviesRequestAction = (page: number, pageSize: number): GetPaginateMoviesRequestAction => ({
	type: MovieAction.GET_PAGINATE_MOVIES_REQUEST,
	payload: {page, pageSize}
})

export const getPaginateMoviesSuccessAction = (payload: IPaginateResponse<IMovie>): GetPaginateMoviesSuccessAction => ({
	type: MovieAction.GET_PAGINATE_MOVIES_SUCCESS,
	payload
})

export const getPaginateMoviesFailedAction = (error: string): GetPaginateMoviesFailedAction => ({
	type: MovieAction.GET_PAGINATE_MOVIES_FAILED,
	error
})

export const deleteMovieRequestAction = (id: string): DeleteMovieRequestAction => ({
	type: MovieAction.DELETE_MOVIES_REQUEST,
	payload: {id}
})

export const deleteMovieSuccessAction = (): DeleteMovieSuccessAction => ({
	type: MovieAction.DELETE_MOVIES_SUCCESS
})

export const deleteMovieFailedAction = (error: string): DeleteMovieFailedAction => ({
	type: MovieAction.DELETE_MOVIES_FAILED,
	error
})

export const likeMovieRequestAction = (id : string) : LikeMovieRequestAction => ({
	type : MovieAction.LIKE_MOVIES_REQUEST,
	payload : { id }
})

export const likeMovieSuccessAction = () : LikeMovieSuccessAction => ({
	type: MovieAction.LIKE_MOVIES_SUCCESS
})

export const likeMovieFailedAction = (error : string) : LikeMovieFailedAction => ({
	type : MovieAction.LIKE_MOVIES_FAILED,
	error
})

export const dislikeMovieRequestAction = (id : string) : DislikeMovieRequestAction => ({
	type : MovieAction.DISLIKE_MOVIES_REQUEST,
	payload : { id }
})

export const dislikeMovieSuccessAction = () : DislikeMovieSuccessAction => ({
	type: MovieAction.DISLIKE_MOVIES_SUCCESS
})

export const dislikeMovieFailedAction = (error : string) : DislikeMovieFailedAction => ({
	type : MovieAction.DISLIKE_MOVIES_FAILED,
	error
})

export type MovieActions =
	GetMoviesRequestAction |
	GetMoviesSuccessAction |
	GetMoviesFailedAction |
	
	GetPaginateMoviesRequestAction |
	GetPaginateMoviesSuccessAction |
	GetPaginateMoviesFailedAction |
	
	DeleteMovieRequestAction |
	DeleteMovieSuccessAction |
	DeleteMovieFailedAction |
	
	LikeMovieRequestAction |
	LikeMovieSuccessAction |
	LikeMovieFailedAction |
	
	DislikeMovieRequestAction |
	DislikeMovieSuccessAction |
	DislikeMovieFailedAction;