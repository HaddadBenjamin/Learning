import React, { FC, useContext, useEffect, useState } from 'react';
import './Todos.css'
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos } from '../../todos.selector';
import { getTodosRequestAction } from '../../todos.actions';

const Todos : FC = () =>
{
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(getTodosRequestAction()) }, [])

    return <>
        { todos &&  <div className="todoContainer">
            <h1 className="title">Todo List</h1>
            <div className="todoElement">
                { todos && todos.todos.map(t => <Todo {...t} key={t.id}/>) }
                <AddTodo />
            </div>
        </div> }
    </>
};

export default Todos;