import {Todo} from "./todos.model";

export interface TodoState
{
    todos : Todo[]
}

export const initialTodoState = {
    todos : [
        { id : '1', title : 'Faire les courses', completed : false, userId : '1'},
        { id : '2', title : 'Laver le chien', completed : true, userId : '1'},
    ]
}