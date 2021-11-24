import axios, {AxiosRequestConfig, AxiosResponse } from 'axios'
import { IMovie } from './movies.model'

const baseUrl = 'http://localhost:3001/movies'
const httpConfiguration = { headers : { 'Content-Type' : 'application/json' } } as AxiosRequestConfig

export const getMovies = async () : Promise<AxiosResponse<IMovie[]>> =>
	(await axios.get(baseUrl, httpConfiguration)).data

export const deleteMovie = async (id : string) : Promise<AxiosResponse<IMovie>> =>
	(await axios.delete(`${baseUrl}/${id}`, httpConfiguration)).data

export const updateMovie = async (movie : IMovie) : Promise<AxiosResponse<IMovie>> =>
	(await axios.put(`${baseUrl}/${movie.id}`, movie, httpConfiguration)).data
	