import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {IMovie} from './movies.model'
import {IPaginateResponse} from "../../shared/Pagination/pagination.model";

const baseUrl = 'http://localhost:3001/movies'
const httpConfiguration = {headers: {'Content-Type': 'application/json'}} as AxiosRequestConfig

export const getMovies = async (): Promise<AxiosResponse<IMovie[]>> =>
	(await axios.get(baseUrl, httpConfiguration)).data

export const getPaginateMovies = async (page: number, pageSize: number): Promise<IPaginateResponse<IMovie>> => {
	const response = (await axios.get(`${baseUrl}?_page=${page}&_limit=${pageSize}`, httpConfiguration))
	const linkHeaders = response.headers["link"];
	const linkNumbers = linkHeaders.match(/\d+/g)!
	const lastPage = Number(linkNumbers[linkNumbers.length - 2])
	const itemsCount = Number(response.headers["x-total-count"])
	
	return {items: response.data, lastPage, itemsCount}
}

export const deleteMovie = async (id: string): Promise<AxiosResponse<IMovie>> =>
	(await axios.delete(`${baseUrl}/${id}`, httpConfiguration)).data

export const updateMovie = async (movie: IMovie): Promise<AxiosResponse<IMovie>> =>
	(await axios.put(`${baseUrl}/${movie.id}`, movie, httpConfiguration)).data
	