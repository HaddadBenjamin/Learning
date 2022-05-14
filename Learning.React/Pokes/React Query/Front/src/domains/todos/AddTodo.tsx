import React, {ChangeEvent} from "react";
import {FC, useState} from "react";
import styles from './AddTodo.module.css'
import {UseMutateFunction} from "react-query";
import ITodo from "./todos.model";
import {AxiosResponse} from "axios";

interface Props {
	onAddTodo: UseMutateFunction<AxiosResponse<ITodo>, unknown, string>
}

const AddTodo: FC<Props> = ({onAddTodo}) => {
	const [title, setTitle] = useState('')
	
	const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
	const addTodo = () => {
		onAddTodo(title)
		setTitle('')
	}
	
	return <div className={styles.container}>
		<input value={title} onChange={onChangeTitle}/>
		<button onClick={addTodo}>Ajouter</button>
	</div>
}

export default AddTodo

