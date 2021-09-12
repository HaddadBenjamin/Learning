import { combineReducers } from "redux";
import { todoReducer } from 'domains/Todo/todo.reducer'

const rootReducer = combineReducers(
{
    todos : todoReducer
});

export default rootReducer