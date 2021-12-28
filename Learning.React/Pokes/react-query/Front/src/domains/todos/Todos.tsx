import React from "react"
import {useMutation, useQuery, useQueryClient} from "react-query";
import ITodo from "./todos.model";
import Todo from "./Todo";
import styles from "./Todos.module.css"
import {addTodo, deleteTodo, getTodos, toggleTodo} from "./todos.apiClient";
import AddTodo from "./AddTodo";

const Todos = () => {
	const {data: todos} = useQuery<ITodo[]>('todos', getTodos);
	
	const queryClient = useQueryClient()
	const invalidateTodosConfiguration = {onSuccess: () => queryClient.invalidateQueries('todos')}
	const {mutate: onAddTodo} = useMutation(addTodo, invalidateTodosConfiguration);
	const {mutate: onDeleteTodo} = useMutation(deleteTodo, invalidateTodosConfiguration);
	const {mutate: onToggleTodo} = useMutation(toggleTodo, invalidateTodosConfiguration);
	
	return <div className={styles.container}>
		{todos?.map(todo =>
			<Todo
				key={todo.id}
				{...todo}
				onDeleteTodo={onDeleteTodo}
				onToggleTodo={onToggleTodo}
			/>)}
		
		<AddTodo onAddTodo={onAddTodo}/>
	</div>
}

export default Todos