import axios, { AxiosResponse } from 'axios'
import { ITodo } from './todo.model'
import {routes} from "./todo.configuration";
import {apiConfiguration, httpConfiguration} from "../../shared/shared.configuration";

export const baseUrl = `${apiConfiguration.baseUrl}${routes.api}`

export const getAllTodos = async () : Promise<AxiosResponse<ITodo[]>> =>
    (await axios.get(baseUrl, httpConfiguration.default)).data

export const addTodo = async (todo : ITodo) : Promise<AxiosResponse<ITodo>> =>
    (await axios.post(baseUrl, todo, httpConfiguration.default)).data

export const patchTitle = async (id : string, title : string) : Promise<AxiosResponse<ITodo>> => 
    (await axios.patch(`${baseUrl}/${id}`, { title : title }, httpConfiguration.default)).data

export const patchCompleted = async (id : string, completed : boolean) : Promise<AxiosResponse<ITodo>> => 
    (await axios.patch(`${baseUrl}/${id}`, { completed : completed }, httpConfiguration.default)).data

export const removeTodo = async (id : string) : Promise<AxiosResponse<ITodo>> =>
    (await axios.delete(`${baseUrl}/${id}`, httpConfiguration.default)).data