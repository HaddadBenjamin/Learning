import { TodoState } from 'domains/todo/todo.state';

export interface ApplicationState
{
    todos? : TodoState
}

export const initialApplicationState : ApplicationState =
{
    //todos : initialTodoState
}