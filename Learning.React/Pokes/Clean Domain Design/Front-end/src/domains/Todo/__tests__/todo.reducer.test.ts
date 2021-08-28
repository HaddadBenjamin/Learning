import {todoReducer} from "../todo.reducer";
import {
    emptyTodoStateMock,
    errorMessageMock,
    todoIdMock,
    todoMock,
    todoStateMock,
    todoTitleMock
} from "../todo.mock";
import {
    addTodoFailedAction,
    addTodoRequestAction,
    addTodoSuccessAction,
    editTodoFailedAction,
    editTodoRequestAction,
    editTodoSuccessAction,
    getTodosFailedAction,
    getTodosRequestAction,
    getTodosSuccessAction,
    removeTodoFailedAction,
    removeTodoRequestAction,
    removeTodoSuccessAction,
    toggleTodoFailedAction,
    toggleTodoRequestAction,
    toggleTodoSuccessAction
} from "../todoActions";
import {ActionStatus} from "../../../shared/domains/Redux/redux.model";
import {TodoState} from "../todo.state";
import {ITodo} from "../todo.model";

describe("todo.reducer", () =>
{
    describe("GET_TODOS", () =>
    {
        it("Should change the status to loading and set the error to undefined on request", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, getTodosRequestAction())

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Loading,
                error: undefined
            }))
        })

        it("Should set the todos, change the status to loaded and set the error to undefined on success", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, getTodosSuccessAction(todoStateMock.todos))

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
            const newState = todoReducer(emptyTodoStateMock, getTodosFailedAction(errorMessageMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Failed,
                error: errorMessageMock,
            }))
        })
    })

    describe("ADD_TODO", () =>
    {
        it("Should change the status to loading and set the error to undefined on request", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, addTodoRequestAction(todoTitleMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Loading,
                error: undefined
            }))
        })

        it("Should add the todo, change the status to loaded and set the error to undefined on success", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, addTodoSuccessAction(todoMock))

            // Then
            expect(newState).toEqual<TodoState>({
                status: ActionStatus.Loaded,
                error: undefined,
                todos : [todoMock]
            })
        })

        it("Should change the status to failed and set the error on failed", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, addTodoFailedAction(errorMessageMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Failed,
                error: errorMessageMock,
            }))
        })
    })

    describe("EDIT_TODO", () =>
    {
        it("Should change the status to loading and set the error to undefined on request", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, editTodoRequestAction(todoIdMock, todoTitleMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Loading,
                error: undefined
            }))
        })

        it("Should edit the todo, change the status to loaded and set the error to undefined on success", () =>
        {
            // Given & When
            const editedTodo : ITodo = { ...todoMock, title : todoTitleMock }
            const newState = todoReducer(todoStateMock, editTodoSuccessAction(editedTodo))
            const firstTodo = newState.todos[0]

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Loaded,
                error: undefined,
            }))
            expect(firstTodo).toBe(editedTodo)
        })

        it("Should change the status to failed and set the error on failed", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, editTodoFailedAction(errorMessageMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Failed,
                error: errorMessageMock,
            }))
        })
    })

    describe("TOGGLE_TODO", () =>
    {
        it("Should change the status to loading and set the error to undefined on request", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, toggleTodoRequestAction(todoIdMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Loading,
                error: undefined
            }))
        })

        it("Should toggle the todo, change the status to loaded and set the error to undefined on success", () =>
        {
            // Given & When
            const toggledTodo : ITodo = { ...todoMock, completed : !todoMock.completed }
            const newState = todoReducer(todoStateMock, toggleTodoSuccessAction(toggledTodo))
            const firstTodo = newState.todos[0]

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Loaded,
                error: undefined,
            }))
            expect(firstTodo).toBe(toggledTodo)
        })

        it("Should change the status to failed and set the error on failed", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, toggleTodoFailedAction(errorMessageMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Failed,
                error: errorMessageMock,
            }))
        })
    })

    describe("REMOVE_TODO", () =>
    {
        it("Should change the status to loading and set the error to undefined on request", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, removeTodoRequestAction(todoIdMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Loading,
                error: undefined
            }))
        })

        it("Should remove the todo, change the status to loaded and set the error to undefined on success", () =>
        {
            // Given & When
            const newState = todoReducer(todoStateMock, removeTodoSuccessAction(todoIdMock))
            const newTodos : ITodo[] = [todoStateMock.todos[0], todoStateMock.todos[2], todoStateMock.todos[3]]

            // Then
            expect(newState).toEqual({
                status: ActionStatus.Loaded,
                error: undefined,
                todos : newTodos
            })
        })

        it("Should change the status to failed and set the error on failed", () =>
        {
            // Given & When
            const newState = todoReducer(emptyTodoStateMock, removeTodoFailedAction(errorMessageMock))

            // Then
            expect(newState).toEqual(expect.objectContaining({
                status: ActionStatus.Failed,
                error: errorMessageMock,
            }))
        })
    })

    describe("UNKNOWN", () =>
    {
        it("Should don't change the state when the action is unkwown", () =>
        {
            // Given & When
            // @ts-ignore
            const newState = todoReducer(emptyTodoStateMock, { type : 'UNKNOWN' })

            // Then
            expect(newState).toEqual(newState)
        })
    })
})