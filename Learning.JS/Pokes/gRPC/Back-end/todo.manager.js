const todos = require("./todo.mock.js");
const {v4: uuidv4} = require("uuid");

const getAllTodos = () => todos
const getTodoById = id => todos.find(todo => todo.id === id)
const getTodoIndex = id => todo.findIndex(todo => todo.id === id)
const addTodo = todo => { todo.id = uuidv4(); return (todos.push(todo), todo) }
const updateTodo = ({id, title, competed}) =>
{
    let todo = getTodoById(id)

    if (todo) { todo.title = title; todo.competed = competed }
}
const removeTodo = id =>
{
    let todoIndex = getTodoIndex(id)

    if (todoIndex != -1) todos.splice(todoIndex, 1);
}

module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    removeTodo
}