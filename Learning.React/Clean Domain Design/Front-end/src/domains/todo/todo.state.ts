import { ITodo } from "./todo.model";
import { ActionStatus, IActionMetadata } from 'shared/domains/redux/redux.model';

export interface TodoState extends IActionMetadata
{
	todos : ITodo[]
}

export const initialTodoState : TodoState =
	{
		status : ActionStatus.Loading,
		error : undefined,
		todos : [],
	}
