import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import idsSaga from '../lazyPagination/ids.saga';

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSagas() {
  yield all([idsSaga()]);
}