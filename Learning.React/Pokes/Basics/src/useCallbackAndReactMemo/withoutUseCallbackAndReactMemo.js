import {useState} from 'react'

// Without useCallback on parent function and React.memo on children :
// - All the components are rendered todo input is updated (WithUseCallbackAndReactMemo, AddTodo, TodoList, Todo)
// - PS : if we had a component AddTodo, the problem will not be here and only AddTodo will be rendered
const WithoutUseCallbackAndReactMemo = () =>
{
    console.log("without useCallback & React.memo : WithUseCallbackAndReactMemo rendering")

    const [todos, setTodos] = useState([{id: 'todo-1',name: 'First Todo'}, {id: 'todo-2',name: 'Second Todo'}])
    const handleAddTodo = text => setTodos(todos.concat({ id: 'todo-'+ todos.length + 1, name: text }))
    const handleRemoveTodo = id => setTodos(todos.filter(todo => todo.id !== id))

    const [text, setText] = useState('');
    const handleChangeText = (event) => setText(event.target.value)

    return <div>
        <h2>Without useCallback and React.memo</h2>
        <p>TodoList and Todo are rendered when add todo text is updated</p>
        <input type="text" value={text} onChange={handleChangeText}/>
        <button type="button" onClick={() => handleAddTodo(text)}> Add Todo</button>
        <TodoList list={todos} onRemove={handleRemoveTodo} />
    </div>
}

const TodoList = ({list, onRemove}) =>
{
    console.log('without useCallback & React.memo : Todo List is Rendering');

    return <ul>
        {list.map((todo) => (<Todo item={todo} key={todo.id} onRemove={onRemove} />) )}
    </ul>
}

const Todo = ({ item, onRemove } ) =>
{
    console.log('without useCallback & React.memo : Todo is Rendering');

    return <li>
        {item.name}
        <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
    </li>
}

export default WithoutUseCallbackAndReactMemo