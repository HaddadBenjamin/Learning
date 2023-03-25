import { TodoState } from './todo.state';
import {ApplicationState} from "../root/root.state";

export const selectTodos = (state : ApplicationState) : TodoState | undefined => state.todos