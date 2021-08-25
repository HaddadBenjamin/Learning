import { ApplicationState } from '../Root/root.state';
import { TodoState } from './todos.state';

export const selectTodos = (state : ApplicationState) : TodoState  => state.todos