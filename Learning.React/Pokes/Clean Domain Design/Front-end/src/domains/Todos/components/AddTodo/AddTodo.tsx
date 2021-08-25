import { useState, ChangeEvent, FC } from 'react';
import "./AddTodo.css"
import { newGuid } from '../../../../shared/utils/string';
import { useDispatch } from 'react-redux';
import { addTodoRequestAction } from '../../todos.actions';

const AddTodo : FC = () => {

    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const addTodoInContextAndModel = () => dispatch(addTodoRequestAction({
        id: newGuid(),
        content: title,
        completed: false
    }))

    const onChangeTodo = (event: ChangeEvent<HTMLInputElement>) : void =>
        setTitle(event.target.value)

    return <div className="container">
        <div className="addButton" onClick={addTodoInContextAndModel}>+</div>
        <input 
            onChange={onChangeTodo}
            value={title}
            placeholder="Ajouter une tâche"
            className="input"
            name="addTodo"/>
    </div>
};

export default AddTodo;