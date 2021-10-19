import React, { FC, useEffect } from 'react';
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos } from '../../todo.selector';
import { getTodosRequestAction } from '../../todo.action';
import styles from './Todos.module.scss'
import {todoReducerKey, todoSagaKey} from "../../todo.configuration";
import useLazyReducer from "../../../../shared/domains/redux/lazyStore/hooks/useLazyReducer";
import useLazySaga from "../../../../shared/domains/redux/lazyStore/hooks/useLazySaga";

const Todos : FC = () =>
{
	const todos = useSelector(selectTodos)
	const dispatch = useDispatch()
	
	const reducerIsInjected = useLazyReducer(todoReducerKey, async () => (await import('../../todo.reducer')).default)
	const sagaIsInjected = useLazySaga(todoSagaKey, async () => (await import('../../todo.saga')).default)

	useEffect(() =>
	{
		if (reducerIsInjected && sagaIsInjected)
			dispatch(getTodosRequestAction())
	}, [reducerIsInjected, sagaIsInjected])
	
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