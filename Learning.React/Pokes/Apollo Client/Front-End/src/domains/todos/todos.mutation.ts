import {gql} from "@apollo/client";

export const ADD_TODO = gql`
    mutation Mutation($todo: AddTodoRequest) {
        createTodo(todo: $todo) { id, title, completed }
    }`

export const UPDATE_TODO = gql`
    mutation Mutation($todo: UpdateTodoRequest) {
        updateTodo(todo: $todo) { id, title, completed }
    }`

export const DELETE_TODO = gql`
    mutation Mutation($request: DeleteTodoRequest) {
        deleteTodo(request: $request) {
            id
        }
    }`