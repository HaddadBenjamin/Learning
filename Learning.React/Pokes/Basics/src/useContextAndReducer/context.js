import {createContext, useReducer} from "react";
import todoReducer from "./reducer";
import usersInitialState from "./state";

export const UserContext = createContext()
const UserContextProvider = ({children}) =>
{
    const [users, dispatch] = useReducer(todoReducer, usersInitialState)

    return <UserContext.Provider value={{users, dispatch}}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider