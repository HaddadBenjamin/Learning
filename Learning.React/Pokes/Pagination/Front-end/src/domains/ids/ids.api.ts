import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {IPaginateResponse} from "../../shared/Pagination/pagination.model";

const baseUrl = 'http://localhost:3001/ids'
const httpConfiguration = {headers: {'Content-Type': 'application/json'}} as AxiosRequestConfig

export const getIds = async (): Promise<AxiosResponse<number[]>> =>
	(await axios.get(baseUrl, httpConfiguration)).data

export const getPaginateIds = async (page: number, pageSize: number): Promise<IPaginateResponse<number>> => {
	const response = (await axios.get(`${baseUrl}?_page=${page}&_limit=${pageSize}`, httpConfiguration))
	const linkHeaders = response.headers["link"];
	const linkNumbers = linkHeaders.match(/\d+/g)!
	const lastPage = Number(linkNumbers[linkNumbers.length - 2])
	const itemsCount = Number(response.headers["x-total-count"])
	
	return {items: response.data, lastPage, itemsCount}
}