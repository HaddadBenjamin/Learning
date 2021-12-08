import { useState} from "react";

const filterTodos = (todos, term) => todos.filter(todo => todo.name.includes(term))

const WithoutUseMemo = () =>
{
    const [todos] = useState([
        {id: 'todo-1',name: 'First Todo'},
        {id: 'todo-2',name: 'Second Todo'}])
    const [term, setTerm] = useState('')

    const filteredTodos = (() =>
    {
        console.log("without useMemo : filtered todos is computed ");
        return filterTodos(todos, term)
    })()

    const onTermChange = event => setTerm(event.target.value)

    return <div>
        <h2>Without useMemo</h2>
        <p>FilteredTodos is computed on each rerender (click on button)</p>
        <FilterTodos term={term} onTermChange={onTermChange}/>
        <TodoList list={filteredTodos} />
        <button onClick={() => setTerm(term)}>Force a rerender</button>
    </div>
}

const FilterTodos = ({ term, onTermChange }) =>
    <input value={term} onChange={onTermChange} placeholder="Filter todos"/>

const TodoList = ({list}) =>
    <ul>
        {list.map((todo) => (<Todo item={todo} key={todo.id} />) )}
    </ul>

const Todo = ({ item } ) =>
    <li>
        {item.name}
    </li>


export default WithoutUseMemo