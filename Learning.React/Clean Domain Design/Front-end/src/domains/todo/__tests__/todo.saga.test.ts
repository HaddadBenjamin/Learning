import {
    addTodo,
    getAllTodos,
    patchCompleted,
    patchTitle,
    removeTodo
} from "../todo.api";
import {
    errorMessageMock,
    errorMock,
    todoMock,
    todoStateMock
} from "../todo.mock";
import {expectSaga} from "redux-saga-test-plan";
import * as matchers from 'redux-saga-test-plan/matchers';
import {
    addTodoSaga,
    editTodoSaga,
    getAllTodosSaga,
    removeTodoSaga,
    todoSaga,
    toggleTodoSaga
} from "../todo.saga";
import {
    TodoAction,
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
} from "../todo.action";
import {call, fork} from "redux-saga-test-plan/matchers";
import {throwError} from "redux-saga-test-plan/providers";
import {useSelector} from "react-redux";
import {selectTodos} from "../todo.selector";
import {ITodo} from "../todo.model";
import {takeLatest} from "redux-saga/effects";
import {excludeSagaPayloadFn} from "shared/domains/redux/redux.util";

jest.mock('react-redux')
jest.mock('../todo.api')
jest.mock('../todo.selector')

describe("todo.saga", () =>
{
    describe("GET_TODOS", () =>
    {
        const action = getTodosRequestAction()

        it("should get all the todos", () =>
        {
            // Given
            (getAllTodos as jest.Mock).mockReturnValue(todoStateMock.todos)

            // When & Then
            return expectSaga(getAllTodosSaga)
                .provide([call(() => getAllTodos)])
                .put(getTodosSuccessAction(todoStateMock.todos))
                .dispatch(action)
                .silentRun()
        })

        it("should handle errors", () =>
            // When & Then
            expectSaga(getAllTodosSaga)
                .provide([[matchers.call.fn(getAllTodos), throwError(errorMock)]])
                .put(getTodosFailedAction(errorMessageMock))
                .dispatch(action)
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
                .provide([call(() => addTodo, todoMock), call(() => getAllTodos, todoStateMock.todos)])
                .put(addTodoSuccessAction(todoMock))
                .put(getTodosRequestAction())
                .dispatch(action)
                .silentRun()
        })

        it("should handle errors", () =>
            // When & Then
            expectSaga(addTodoSaga, action)
                .provide([[matchers.call.fn(addTodo), throwError(errorMock)]])
                .put(addTodoFailedAction(errorMessageMock))
                .dispatch(action)
                .silentRun())
    })

    describe("EDIT_TODO", () =>
    {
        const action = editTodoRequestAction(todoMock.id, todoMock.title)

        it("should edit a todo", () =>
        {
            (patchTitle as jest.Mock).mockReturnValue(todoMock)

            // When & Then
            return expectSaga(editTodoSaga, action)
                .provide([call(() => patchTitle, todoMock.id, todoMock.title), call(() => getAllTodos, todoStateMock.todos)])
                .put(editTodoSuccessAction(todoMock))
                .put(getTodosRequestAction())
                .dispatch(action)
                .silentRun()
        })

        it("should handle errors", () =>
            // When & Then
            expectSaga(editTodoSaga, action)
                .provide([[matchers.call.fn(patchTitle), throwError(errorMock)]])
                .put(editTodoFailedAction(errorMessageMock))
                .dispatch(action)
                .silentRun())
    })

    describe("TOGGLE_TODO", () =>
    {
        const action = toggleTodoRequestAction(todoMock.id)

        it("should toggle a todo", () =>
        {
            // Given
            (selectTodos as jest.Mock).mockReturnValue(todoStateMock);
            (patchCompleted as jest.Mock).mockReturnValue(todoMock)
            const toggledTodo : ITodo = { ...todoMock, completed : !todoMock.completed}

            // When & Then
            return expectSaga(toggleTodoSaga, action)
                .provide([call(() => patchCompleted, todoMock.id, toggledTodo.completed), call(() => getAllTodos, todoStateMock.todos)])
                .put(toggleTodoSuccessAction(toggledTodo))
                .put(getTodosRequestAction())
                .dispatch(action)
                .silentRun()
        })

        it("should handle errors", () =>
        {
            // Given
            (selectTodos as jest.Mock).mockReturnValue(todoStateMock);
            (useSelector as jest.Mock).mockReturnValue(todoStateMock)

            // When & Then
            return expectSaga(toggleTodoSaga, action)
                .provide([[matchers.call.fn(patchCompleted), throwError(errorMock)]])
                .put(toggleTodoFailedAction(errorMessageMock))
                .dispatch(action)
                .silentRun()
        })
    })

    describe("REMOVE_TODO", () =>
    {
        const action = removeTodoRequestAction(todoMock.id)

        it("should remove a todo", () =>
        {
            // Given
            (removeTodo as jest.Mock).mockReturnValue(todoMock)

            // When & Then
            return expectSaga(removeTodoSaga, action)
                .provide([call(() => removeTodo, todoMock.id), call(() => getAllTodos, todoStateMock.todos)])
                .put(removeTodoSuccessAction(todoMock.id))
                .put(getTodosRequestAction())
                .dispatch(action)
                .silentRun()
        })

        it("should handle errors", () =>
            // When & Then
            expectSaga(removeTodoSaga, action)
                .provide([[matchers.call.fn(removeTodo), throwError(errorMock)]])
                .put(removeTodoFailedAction(errorMessageMock))
                .dispatch(action)
                .silentRun())
    })

    it("watchTodosSagas should watch and takeLatest GET_TODOS_REQUEST, ADD_TODO_REQUEST, EDIT_TODO_REQUEST, TOGGLE_TODO_REQUEST, REMOVE_TODO_REQUEST", () =>
    {
        const iterator = todoSaga();

        // assert
        expect(excludeSagaPayloadFn(iterator.next().value)).toEqual(excludeSagaPayloadFn(fork(takeLatest, TodoAction.GET_TODOS_REQUEST, getAllTodosSaga)));
        expect(excludeSagaPayloadFn(iterator.next().value)).toEqual(excludeSagaPayloadFn(fork(takeLatest, TodoAction.ADD_TODO_REQUEST, addTodoSaga)));
        expect(excludeSagaPayloadFn(iterator.next().value)).toEqual(excludeSagaPayloadFn(fork(takeLatest, TodoAction.EDIT_TODO_REQUEST, editTodoSaga)));
        expect(excludeSagaPayloadFn(iterator.next().value)).toEqual(excludeSagaPayloadFn(fork(takeLatest, TodoAction.TOGGLE_TODO_REQUEST, toggleTodoSaga)));
        expect(excludeSagaPayloadFn(iterator.next().value)).toEqual(excludeSagaPayloadFn(fork(takeLatest, TodoAction.REMOVE_TODO_REQUEST, removeTodoSaga)));
    })
})