import { combineReducers } from "redux";
import { todoReducer } from '../Todo/todo.reducer'

const rootReducer = combineReducers(
{
    todos : todoReducer
});

export default rootReducer