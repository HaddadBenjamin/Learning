import {TodoState} from "./todos.state";
import {TodosActions} from "./todos.actions";

export const todosReducer = (state : TodoState, action : TodosActions) : TodoState =>
    state