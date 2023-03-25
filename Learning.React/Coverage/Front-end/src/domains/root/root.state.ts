import {TodoState} from "../todo/todo.state";

export interface ApplicationState
{
	todos? : TodoState
}

export const initialApplicationState : ApplicationState =
{
	todos : undefined
}