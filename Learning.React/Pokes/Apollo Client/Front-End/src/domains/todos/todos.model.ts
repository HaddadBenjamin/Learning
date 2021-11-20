import {GraphqlModel} from "../../shared/domains/graphql/graphql.model";

export interface Todo
{
	id : string
	title : string
	completed : boolean
}

export type GraphQlTodo = Todo & GraphqlModel

export interface GetTodos
{
	getTodos : GraphQlTodo[]
}