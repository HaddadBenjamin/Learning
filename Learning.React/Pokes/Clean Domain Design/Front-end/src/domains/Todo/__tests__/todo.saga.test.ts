import {addTodo, getAllTodos} from "../todo.api";
import {errorMessageMock, errorMock, todoMock, todoStateMock} from "../todo.mock";
import {expectSaga} from "redux-saga-test-plan";
import * as matchers from 'redux-saga-test-plan/matchers';
import {addTodoSaga, getAllTodosSaga} from "../todo.saga";
import {
    addTodoFailedAction,
    addTodoRequestAction,
    addTodoSuccessAction,
    getTodosFailedAction,
    getTodosRequestAction,
    getTodosSuccessAction
} from "../todoActions";
import {call} from "redux-saga-test-plan/matchers";
import {throwError} from "redux-saga-test-plan/providers";

jest.mock('../todo.api')

describe("todo.saga", () =>
{
    describe("GET_TODOS", () =>
    {
        it("should get all the todos", () =>
        {
            // Given
            (getAllTodos as jest.Mock).mockReturnValue(todoStateMock.todos)

            // When & Then
            return expectSaga(getAllTodosSaga)
                .provide([call(() => getAllTodos)])
                .put(getTodosSuccessAction(todoStateMock.todos))
                .dispatch(getTodosRequestAction())
                .silentRun()
        })

        it("should handle errors", () =>
            // When & Then
            expectSaga(getAllTodosSaga)
                .provide([[matchers.call.fn(getAllTodos), throwError(errorMock)]])
                .put(getTodosFailedAction(errorMessageMock))
                .dispatch(getTodosRequestAction())
                .silentRun())
    })

    describe("ADD_TODO", () =>
    {
        const action = addTodoRequestAction(todoMock.title)
        it("should add a todo", () =>
        {
            // Given
            (addTodo as jest.Mock).mockReturnValue(todoMock)

            // When & Then
            return expectSaga(addTodoSaga, action)
                .provide([call(() => addTodo, todoMock)])
                .put(addTodoSuccessAction(todoMock))
                .dispatch(action)
                .silentRun()
        })

        it("should handle errors", () =>
            expectSaga(addTodoSaga, action)
                .provide([[matchers.call.fn(addTodo), throwError(errorMock)]])
                .put(addTodoFailedAction(errorMessageMock))
                .dispatch(action)
                .silentRun())
    })
})