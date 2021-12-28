import {todosApi} from "./todos.configuration";
import ITodo from "./todos.model";
import {newGuid} from "../../shared/newGuid";
import axios, {AxiosResponse} from "axios";

export const getTodos = async (): Promise<ITodo[]> =>
	(await axios.get(`${todosApi}/todos/`)).data

export const addTodo = async (title: string): Promise<AxiosResponse<ITodo>> =>
	await axios.post(`${todosApi}/todos/`, {id: newGuid(), title: title, completed: false})

export const toggleTodo = async ({id, completed}: ITodo): Promise<AxiosResponse<ITodo>> =>
	await axios.patch(`${todosApi}/todos/${id}`, {completed: !completed})

export const deleteTodo = async (id: string): Promise<AxiosResponse<ITodo>> =>
	axios.delete(`${todosApi}/todos/${id}`)