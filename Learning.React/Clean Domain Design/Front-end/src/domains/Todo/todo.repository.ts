import {newGuid} from "shared/utils/newGuid";
import {ITodo} from "./todo.model";

export const createTodo = (title : string) : ITodo =>
({
    id : newGuid(),
    completed : false,
    title
})