import { ApplicationState } from '../Root/root.state';
import { TodoState } from './todo.state';

export const selectTodos = (state : ApplicationState) : TodoState  => state.todos