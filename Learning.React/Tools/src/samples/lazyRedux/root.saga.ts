import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSagas() {
  yield [
    // fork(watchTodosSagas),
  ];
}
