import {Express} from "express";
import {todoStateMock} from "./todo.mock";
import {routes} from "./todo.configuration";
import {ITodo} from "./todo.model";

export default (app : Express) =>
{
    app
        .route(routes.api)
        .get((req, res) =>
        {
            res.status(200)
            res.json(todoStateMock.todos)
        })

        .post((req, res) =>
        {
            const todo = req.body as ITodo

            todoStateMock.todos.push(todo)

            res.status(201)
            res.json(todo)
        });

    app
        .route(`${routes.api}/:id`)
        .patch((req, res) =>
        {
            const { id } = req.params
            let todo = todoStateMock.todos.find(todo => todo.id === id)

            if (todo)
                todo = { ...todo, ...req.body }

            todoStateMock.todos = todoStateMock.todos.filter(t => t.id === id ? todo : t)

            res.json(todo)
        })
        .delete((req, res) =>
        {
            const { id } = req.params
            const todo = todoStateMock.todos.find(todo => todo.id === id)

            if (todo)
                todoStateMock.todos = todoStateMock.todos.filter(todo => todo.id !== id)

            res.status(200)
            res.json(todo)
        })
}