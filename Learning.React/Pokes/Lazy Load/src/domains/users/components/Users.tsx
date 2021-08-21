import React, {FC} from "react";
import {selectUsers} from "../users.selectors";
import {useSelector} from "react-redux";

const Users : FC = () =>
{
    const users = useSelector(selectUsers)

    // TODO : lazy load reducer / saga

    return <div>
        {JSON.stringify(users)}
    </div>
}

export default Users