import { initialTodoState, TodoState } from '../Todo/todo.state';

export interface ApplicationState
{
    todos : TodoState
}

export const initialApplicationState : ApplicationState =
{
    todos : initialTodoState
}