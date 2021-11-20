let todos = [
    { id : "1", title : "Faire le ménage", completed : false },
    { id : "2", title : "Faire ma compta", completed : true },
    { id : "3", title : "Appeler Marine", completed : false },
    { id : "4", title : "Acheter des croquettes pour petit chien", completed : false }
]

const getTodos = () => todos
const getTodoById = id => todos.find(todo => todo.id === id)
const addTodo = todo => { todos.push(todo); return todo; }
const updateTodo = todo => { todos = todos.map(t => t.id === todo.id ? todo : t); return todo; }
const deleteTodo = todo => { todos = todos.filter(t => t.id !== todo.id); return todo; }

module.exports = { getTodos, getTodoById, addTodo, updateTodo, deleteTodo }