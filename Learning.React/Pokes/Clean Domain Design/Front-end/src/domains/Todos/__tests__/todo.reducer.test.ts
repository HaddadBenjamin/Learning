import {todosReducer} from "../todos.reducer";
import {emptyTodoStateMock, todoStateMock} from "../todos.mock";
import {getTodosFailedAction, getTodosRequestAction, getTodosSuccessAction} from "../todos.actions";
import {ActionStatus} from "../../../shared/domains/Redux/redux.model";

describe("todo.reducer", () =>
{
    describe("GET_TODOS", () =>
    {
        it("Should change the status to loading and set the error to undefined on request", () =>
        {
            // Given & When
            const newState = todosReducer(emptyTodoStateMock, getTodosRequestAction())

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Loading,
                error: undefined
            }))
        })

        it("Should change the status to loaded, set the todos, and set the error to undefined on success", () =>
        {
            // Given & When
            const newState = todosReducer(emptyTodoStateMock, getTodosSuccessAction(todoStateMock.todos))

            // Then
            expect(newState).toEqual({
                status: ActionStatus.Loaded,
                error: undefined,
                todos : todoStateMock.todos
            })
        })

        it("Should change the status to failed and set the error on failed", () =>
        {
            // Given & When
            const errorMessage = "404 not found"
            const newState = todosReducer(emptyTodoStateMock, getTodosFailedAction(errorMessage))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Failed,
                error: errorMessage,
            }))
        })
    })
})