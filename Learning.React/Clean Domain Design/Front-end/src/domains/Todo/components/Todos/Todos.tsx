import React, { FC, useEffect } from 'react';
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos } from '../../todo.selector';
import { getTodosRequestAction } from '../../todo.action';
import styles from './Todos.module.scss'

const Todos : FC = () =>
{
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(getTodosRequestAction()) }, [])

    return <>
        { todos &&
            <>
                <h1 className={styles.title}>Todo List</h1>
                <div className={styles.container}>
                    { todos && todos.todos.map(t => <Todo {...t} key={t.id}/>) }
                    <AddTodo />
                </div>
            </>
        }
    </>
};

export default Todos;