import { ApplicationState } from '../root/root.state';
import { TodoState } from './todo.state';

export const selectTodos = (state : ApplicationState) : TodoState | undefined => state.todos