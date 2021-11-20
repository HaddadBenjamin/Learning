import {FC, useState} from "react";
import {useQuery, useMutation} from "@apollo/client";
import {
	AddTodoRequest,
	DeleteTodoRequest,
	GetTodosResponse,
	Todo as TodoModel,
	UpdateTodoRequest
} from "../todos.model";
import {GET_TODOS} from "../todos.query";
import {ADD_TODO, UPDATE_TODO, DELETE_TODO} from "../todos.mutation";
import {newGuid} from "../../../shared/utils/newGuid";

export const Todo : FC<TodoModel> = ({ id, title, completed }) =>
{
	const [toggleTodo] = useMutation<TodoModel, UpdateTodoRequest>(UPDATE_TODO, {
		refetchQueries : [GET_TODOS],
		variables : { todo : { title, id, completed : !completed } }
	})
	
	const [deleteTodo] = useMutation<TodoModel, DeleteTodoRequest>(DELETE_TODO, {
		refetchQueries : [GET_TODOS],
		variables : { request : { id } }
	})

	return <div style={{ display : 'flex', gap : '0.5rem', marginTop : '0.5rem'}}>
		<div>{title}</div>
		<button onClick={toggleTodo}>{completed.toString()}</button>
		<button onClick={deleteTodo}>X</button>
	</div>
}
export const TodoList : FC = () =>
{
	const [title, setTitle] = useState<string | undefined>()
	const onTitleChange = (event : React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)

	const [addTodo, dataLoadingAndErrorObject ] = useMutation<TodoModel, AddTodoRequest>(ADD_TODO, {
		refetchQueries : [GET_TODOS],
		variables : { todo : { title, id : newGuid(), completed : false } }
	})
	
	const onAddTodo = () => { addTodo(); setTitle('') }
	
	const { data, loading, error } = useQuery<GetTodosResponse>(GET_TODOS)
	return <>
		{ loading ? "loading..." :
		error ? `Error... ${error}` :
		<div>
			<input placeholder="Ajouter une nouvelle todo" onChange={onTitleChange} value={title} onClick={onAddTodo}></input>
			{ data?.getTodos?.map(todo => <Todo key={todo.id} {...todo}/>)}
		</div> }
	</>
}