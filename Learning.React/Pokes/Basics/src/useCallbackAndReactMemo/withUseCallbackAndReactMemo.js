import {memo, useCallback, useState} from 'react'

// With useCallback on parent function and React.memo on children :
// - Only AddTodo is rendered when the add todo input is updated
// - PS : if we had a component AddTodo, the problem will not be here and only AddTodo will be rendered
const WithUseCallbackAndReactMemo = () =>
{
    console.log("WithUseCallbackAndReactMemo rendering")

    const [todos, setTodos] = useState([{id: 'todo-1',name: 'First Todo'}, {id: 'todo-2',name: 'Second Todo'}])
    const handleAddTodo = useCallback((text) => setTodos(todos.concat({ id: 'todo-'+ todos.length + 1, name: text })), [todos])
    const handleRemoveTodo = useCallback(id => setTodos(todos.filter(todo => todo.id !== id)), [todos])

    const [text, setText] = useState('');
    const handleChangeText = (event) => setText(event.target.value)

    return <div>
        <h2>With useCallback (parent function) and React.memo (children component)</h2>
        <p>TodoList and Todo are NOT rendered when add todo text is updated, useCallback memoïse a function</p>
        <input type="text" value={text} onChange={handleChangeText}/>
        <button type="button" onClick={() => handleAddTodo(text)}> Add Todo</button>
        <TodoList list={todos} onRemove={handleRemoveTodo} />
    </div>
}

const TodoList = memo(({list, onRemove}) =>
{
    console.log('Todo List is Rendering');

    return <ul>
        {list.map((todo) => (<Todo item={todo} key={todo.id} onRemove={onRemove} />) )}
    </ul>
})

const Todo = memo(({ item, onRemove } ) =>
{
    console.log('Todo is Rendering');

    return <li>
        {item.name}
        <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
    </li>
})

export default WithUseCallbackAndReactMemo