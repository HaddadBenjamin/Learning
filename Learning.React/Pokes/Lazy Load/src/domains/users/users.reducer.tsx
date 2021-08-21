import {UserState} from "./users.state";
import {UsersActions} from "./users.actions";

export const usersReducer = (state : UserState, action :UsersActions) : UserState =>
    state