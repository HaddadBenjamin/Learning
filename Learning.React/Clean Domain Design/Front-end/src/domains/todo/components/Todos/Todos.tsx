import React, { FC, useEffect } from 'react';
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos } from '../../todo.selector';
import { getTodosRequestAction } from '../../todo.action';
import styles from './Todos.module.scss'
import {lazyStore} from "../../../root/root.store";
import {todoReducerKey, todoSagaKey} from "../../todo.configuration";

const Todos : FC = () =>
{
	const todos = useSelector(selectTodos)
	const dispatch = useDispatch()
	
	useEffect(() =>
	{
		const asyncEffect = async () =>
		{
			const { default : todoReducer } = await import('../../todo.reducer')
			const { todoSaga } = await import ('../../todo.saga')
			
			lazyStore.injectReducer(todoReducerKey, todoReducer);
			lazyStore.injectSaga(todoSagaKey, todoSaga)
			
			dispatch(getTodosRequestAction())
		}
		
		asyncEffect()
	}, [])
	
	return <>
		{ todos &&
    <>
        <h1 className={styles.title}>Todo List</h1>
        <div className={styles.container}>
					{ todos.todos.map(t => <Todo {...t} key={t.id}/>) }
            <AddTodo />
        </div>
    </>
		}
	</>
};

export default Todos;