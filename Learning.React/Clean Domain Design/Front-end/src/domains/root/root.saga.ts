import { fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import watchTodosSagas from "../todo/todo.saga";

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSagas() {
    yield [
        fork(watchTodosSagas),
    ]
}