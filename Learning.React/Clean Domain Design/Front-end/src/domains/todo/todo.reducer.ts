import { TodoState, initialTodoState } from './todo.state';
import { TodoAction, TodoActions } from './todo.action';
import { failedActionMetadata, loadedActionMetadata, loadingActionMetadata } from 'shared/domains/redux/redux.util';

export const todoReducer = (state: TodoState = initialTodoState, action: TodoActions)
: TodoState =>
{
    switch (action.type)
    {
        case TodoAction.GET_TODOS_REQUEST :     return loadingActionMetadata(state)
        case TodoAction.GET_TODOS_SUCCESS :     return { ...loadedActionMetadata(state), todos: action.payload }
        case TodoAction.GET_TODOS_FAILED :      return failedActionMetadata(action.error, state)

        case TodoAction.ADD_TODO_REQUEST :      return loadingActionMetadata(state)
        case TodoAction.ADD_TODO_SUCCESS :      return loadedActionMetadata(state)
        case TodoAction.ADD_TODO_FAILED :       return failedActionMetadata(action.error, state)
     
        case TodoAction.EDIT_TODO_REQUEST :     return loadingActionMetadata(state)
        case TodoAction.EDIT_TODO_SUCCESS :     return loadedActionMetadata(state)
        case TodoAction.EDIT_TODO_FAILED :      return failedActionMetadata(action.error, state)

        case TodoAction.TOGGLE_TODO_REQUEST :   return loadingActionMetadata(state)
        case TodoAction.TOGGLE_TODO_SUCCESS :   return loadedActionMetadata(state)
        case TodoAction.TOGGLE_TODO_FAILED :    return failedActionMetadata(action.error, state)

        case TodoAction.REMOVE_TODO_REQUEST :   return loadingActionMetadata(state)
        case TodoAction.REMOVE_TODO_SUCCESS :   return loadedActionMetadata(state)
        case TodoAction.REMOVE_TODO_FAILED :    return failedActionMetadata(action.error, state)

        default : return state
    }
}