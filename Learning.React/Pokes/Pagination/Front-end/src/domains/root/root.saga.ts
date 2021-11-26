import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import idsSaga from "../ids/ids.saga";

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSagas() : Generator<any, any, any> {
  yield all([
    idsSaga(),
  ]);
}