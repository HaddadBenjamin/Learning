import {GraphqlResource} from "../../shared/domains/graphql/graphql.model";

export interface Todo
{
	id : string
	title : string
	completed : boolean
}

export type GraphQlTodo = Todo & GraphqlResource

export interface GetTodosResponse
{
	getTodos : GraphQlTodo[]
}

export interface AddTodoRequest
{
	todo : Todo
}

export interface UpdateTodoRequest
{
	todo : Todo
}

export interface DeleteTodoRequest
{
	id : string
}