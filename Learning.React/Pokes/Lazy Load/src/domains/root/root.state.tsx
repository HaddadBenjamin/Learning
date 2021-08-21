import {IngredientsState} from "../ingredients/ingredients.state";
import {TodoState} from "../todos/todos.state";
import {initialUserState, UserState} from "../users/users.state";

export interface RootState
{
    users : UserState
    ingredients? : IngredientsState
    todos? : TodoState
}

export const initialRootState : RootState =
{
    users : initialUserState,
}