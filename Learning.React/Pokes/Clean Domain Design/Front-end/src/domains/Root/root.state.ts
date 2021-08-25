import { initialTodosState, TodoState } from '../Todos/todos.state';

export interface ApplicationState
{
    todos : TodoState
}

export const initialApplicationState : ApplicationState =
{
    todos : initialTodosState
}