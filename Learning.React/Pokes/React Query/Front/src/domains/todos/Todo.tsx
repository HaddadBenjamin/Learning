import ITodo from "./todos.model";
import {FC} from "react";
import React from "react";
import styles from "./Todo.module.css"
import {UseMutateFunction} from "react-query";
import {AxiosResponse} from "axios";

interface Props {
	onDeleteTodo: UseMutateFunction<AxiosResponse<ITodo>, unknown, string>
	onToggleTodo: UseMutateFunction<AxiosResponse<ITodo>, unknown, ITodo>
}

const Todo: FC<ITodo & Props> = (todo) => {
	const {id, title, completed, onDeleteTodo, onToggleTodo} = todo
	
	return <div className={styles.container}>
		<div>{title}</div>
		
		<div className={styles.rightContainer}>
			<input type="checkbox" checked={completed} onChange={() => onToggleTodo(todo)}/>
			<button className={styles.deleteButton} onClick={() => onDeleteTodo(id)}>X</button>
		</div>
	</div>
}

export default Todo
