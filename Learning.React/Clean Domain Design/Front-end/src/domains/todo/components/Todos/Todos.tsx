import React, {FC, useEffect, useState} from 'react';
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos } from '../../todo.selector';
import { getTodosRequestAction } from '../../todo.action';
import styles from './Todos.module.scss'
import {todoReducerKey, todoSagaKey} from "../../todo.configuration";
import useLazyReducer from "../../../../shared/domains/redux/lazyRedux/hooks/useLazyReducer";
import useLazySaga from "../../../../shared/domains/redux/lazyRedux/hooks/useLazySaga";

const Todos : FC = () =>
{
	const todos = useSelector(selectTodos)
	const dispatch = useDispatch()
	
	const reducerIsInjected = useLazyReducer(todoReducerKey, 'domains/todo/todo.reducer')
	const sagaIsInjected = useLazySaga(todoSagaKey, 'domains/todo/todo.saga')
	
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() =>
	{
		if (reducerIsInjected && sagaIsInjected && !isInitialized)
		{
			dispatch(getTodosRequestAction())
			setIsInitialized(true)
		}
	}, [reducerIsInjected, sagaIsInjected, isInitialized, dispatch])
	
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