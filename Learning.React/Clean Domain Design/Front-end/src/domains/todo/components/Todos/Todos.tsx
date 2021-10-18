import React, { FC, useEffect } from 'react';
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos } from '../../todo.selector';
import { getTodosRequestAction } from '../../todo.action';
import styles from './Todos.module.scss'
import {injectReducer} from "../../../root/root.reducer";
import {sagaMiddleware} from "../../../root/root.saga";
import watchTodosSagas from "../../todo.saga";
import store from "../../../root/root.store";

const Todos : FC = () =>
{
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()

  useEffect(() =>
  {
    import('../../todo.reducer')
      .then(({ default: reducer }) =>
      {
        injectReducer(store, 'todos', reducer);
        sagaMiddleware.run(watchTodosSagas)
        dispatch(getTodosRequestAction())
      })
     }, []
  )

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