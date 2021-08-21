import React, {FC} from "react";
import {selectTodos} from "../todos.selectors";
import {useSelector} from "react-redux";

const Todos : FC = () =>
{
    const todos = useSelector(selectTodos)

    // TODO : lazy load reducer / saga

    return <>
        {JSON.stringify(todos)}
    </>
}

export default Todos