import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSagas() : Generator<any, any, any> {
    yield [
      // fork(watchTodosSagas),
      // fork(watchOtherSagas),
    ]
}