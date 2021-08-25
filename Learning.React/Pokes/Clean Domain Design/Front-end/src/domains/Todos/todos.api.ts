import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ITodo } from './todos.model'

const url : string = 'http://localhost:3001/todos'
const configuration : AxiosRequestConfig = { headers : { 'Content-Type' : 'application/json' } }

export const getAllTodos = async () : Promise<AxiosResponse<ITodo[]>> =>
    (await axios.get(url, configuration)).data

export const addTodo = async (todo : ITodo) : Promise<AxiosResponse<ITodo>> =>
    (await axios.post(url, todo, configuration)).data

export const patchTitle = async (id : string, title : string) : Promise<AxiosResponse<ITodo>> => 
    (await axios.patch(`${url}/${id}`, { title : title }, configuration)).data

export const patchCompleted = async (id : string, completed : boolean) : Promise<AxiosResponse<ITodo>> => 
    (await axios.patch(`${url}/${id}`, { completed : completed }, configuration)).data

export const removeTodo = async (id : string) : Promise<AxiosResponse<ITodo>> =>
    (await axios.delete(`${url}/${id}`, configuration)).data