import {FC} from "react";
import {useQuery} from "@apollo/client";
import {GetTodos, Todo as TodoModel} from "../todos.model";
import {GET_TODOS} from "../todos.query";

export const Todo : FC<TodoModel> = ({ title, completed }) =>
	<div style={{ display : 'flex', gap : '0.5rem', marginTop : '0.5rem'}}>
		<div>{title}</div>
		<button>{completed.toString()}</button>
	</div>

export const TodoList : FC = () =>
{
	const { data, loading, error } = useQuery<GetTodos>(GET_TODOS)
	
	return <>
		{ loading ? "loading..." :
		error ? `Error... ${error}` :
		<div>
			<input placeholder="Ajouter une nouvelle todo"></input>
			{ data?.getTodos?.map(todo => <Todo key={todo.id} {...todo}/>)}
		</div> }
	</>
}