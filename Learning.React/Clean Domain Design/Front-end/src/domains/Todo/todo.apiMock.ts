import {Router} from "express";
import {todoStateMock} from "./todo.mock";
import {routes} from "./todo.configuration";
import {ITodo} from "./todo.model";

export default (router : Router) =>
{
    router.get(routes.api, (req, res) =>
    {
        res.status(200)
        res.json(todoStateMock.todos)
    })

    router.post(routes.api, (req, res) =>
    {
        const todo = req.body as ITodo

        todoStateMock.todos.push(todo)

        res.status(201)
        res.json(todo)
    })

    router.patch(`${routes.api}/:id`, (req, res) =>
    {
        const { id } = req.params
        let todo = todoStateMock.todos.find(todo => todo.id === id)

        if (todo)
            todo = { ...todo, ...req.body }

        todoStateMock.todos = todoStateMock.todos.filter(t => t.id === id ? todo : t)

        res.json(todo)
    })

    router.delete(`${routes.api}/:id`, (req, res) =>
    {
        const { id } = req.params
        const todo = todoStateMock.todos.find(todo => todo.id === id)

        if (todo)
            todoStateMock.todos = todoStateMock.todos.filter(todo => todo.id !== id)

        res.status(200)
        res.json(todo)
    })
}